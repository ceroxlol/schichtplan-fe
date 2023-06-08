import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "react-modal";

import userService from "../services/user";
import shiftService from "../services/shift";
import ShiftForm from "./ShiftForm";

import { formatTimeRange } from "../utils/helpers";

import "./ShiftPlan.css"

import 'moment/locale/de';
import { toast } from "react-toastify";

Modal.setAppElement("#root");

const ShiftPlan = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [startDate, setStartDate] = useState(moment().startOf("week"));
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await (id ? userService.getUser(id) : userService.getAllUsers());
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setEmployees(data)
    }

    fetchUsersData();
  }, [id]);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await (id ? shiftService.getShiftPlan(id) : shiftService.getAllShiftPlans());
        const data = await response.data;
        setShifts(data);
        // setLoading(false);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          console.log('Unauthorized access!');
          navigate("/login")
        } else {
          console.error(error);
        }
      }
    }

    fetchScheduleData();
  }, [id, navigate])

  const handlePrevWeekClick = () => {
    setStartDate(startDate.clone().subtract(1, "week"));
  };

  const handleNextWeekClick = () => {
    setStartDate(startDate.clone().add(1, "week"));
  };

  const handleCellClick = (employeeId, employeeName, date) => {
    const shift = shifts.find((s) => s.employeeId === employeeId && moment(s.start).format("YYYY-MM-DD") === date);
    const type = shift ? shift.type : "Normal";

    const selectedShift = {
      employeeId,
      employeeName,
      date,
      start: null,
      end: null,
      type,
      ...shift,
    };
    setSelectedShift(selectedShift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = async (employeeId, start, end, type) => {
    setIsModalOpen(false);
    try {
      const formattedStart = moment(start).toISOString();
      const formattedEnd = moment(end).toISOString();
      const index = shifts.findIndex((s) => s.employeeId === employeeId && moment(s.start).isSame(moment(start), 'day'));
      if (index === -1) {
        var newShift = { id: null, employeeId, start: formattedStart, end: formattedEnd, type };
        //console.log(newShift);
        const response = await shiftService.upsertShift(newShift);
        newShift.id = response.data.id;
        setShifts(prevShifts => [...prevShifts, newShift]);
      } else {
        const shiftToUpdate = shifts[index];
        const updatedShift = { ...shiftToUpdate, start: formattedStart, end: formattedEnd, type };
        await shiftService.upsertShift(updatedShift);
        shifts.splice(index, 1, updatedShift);
        setShifts([...shifts]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteModal = async () => {
    setIsModalOpen(false);
    try {
      await shiftService.deleteShift(selectedShift.id);
      setShifts(shifts.filter(shift => shift.id !== selectedShift.id));
      toast.done("Schicht gelöscht!");
      console.log("delete shift")
    } catch (error) {
      console.error(error);
      toast.error("Etwas lief schief beim anlegen der Schicht...");
    }
  };

  // Function to calculate shift hours per week
  const calculateShiftHoursPerWeek = (shifts) => {
    const weekStart = moment(startDate).startOf("week");
    const weekEnd = moment(startDate).endOf("week");

    const totalShiftHours = shifts.reduce((total, shift) => {
      const start = moment(shift.start);
      const end = moment(shift.end);

      if (start.isBetween(weekStart, weekEnd) && end.isBetween(weekStart, weekEnd)) {
        var duration = moment.duration(end.diff(start)).asHours(); 
        
        if (duration >= 8) {
          duration -= 0.75; // Subtract 45 minutes (0.75 hours)
        } else if (duration >= 6) {
          duration -= 0.5; // Subtract 30 minutes (0.5 hours)
        }
        
        return total + duration;
      }

      return total;
    }, 0);

    return totalShiftHours.toFixed(2); // Return the value with 2 decimal places
  };

  // Function to calculate total shift days per month
  const calculateDaysPerMonth = (shifts) => {
    // const shiftDays = shifts.reduce((total, shift) => {
    //   const start = moment(shift.start);
    //   const end = moment(shift.end);
    //   const duration = moment.duration(end.diff(start));
    //   const shiftDays = duration.asDays() + 1; // Adding 1 to include both start and end days
    //   return total + shiftDays;
    // }, 0);

    // return shiftDays;
    return shifts.length;
  };

  // Function to calculate total shift hours per month
  const calculateHoursPerMonth = (shifts) => {
    const shiftDays = shifts.reduce((total, shift) => {
      const start = moment(shift.start);
      const end = moment(shift.end);
      const duration = moment.duration(end.diff(start)).asHours();
      return total + duration;
    }, 0);

    return shiftDays;
  };

  // Function to calculate vacation days per month
  const calculateShiftDaysPerMonth = (shifts) => {
    const vacationShifts = shifts.filter((shift) => shift.type === "Normal");
    const vacationDays = calculateDaysPerMonth(vacationShifts);
    return vacationDays;
  };

  // Function to calculate vacation days per month
  const calculateVacationDaysPerMonth = (shifts) => {
    const vacationShifts = shifts.filter((shift) => shift.type === "Urlaub");
    const vacationDays = calculateDaysPerMonth(vacationShifts);
    return vacationDays;
  };

  // Function to calculate sick leave days per month
  const calculateSickLeaveDaysPerMonth = (shifts) => {
    const sickLeaveShifts = shifts.filter((shift) => shift.type === "Krankheit");
    const sickLeaveDays = calculateDaysPerMonth(sickLeaveShifts);
    return sickLeaveDays;
  };



  return (
    <div className="shift-schedule-container">
      <div className="shift-schedule-header">
        {id ? <h2>Mein Schichtplan</h2> : <h2>Genereller Schichtplan</h2>}
      </div>
      <div style={{ display: "flex", justifyContent: "space-between" }}>
        <button className="shift-schedule-container-button" onClick={handlePrevWeekClick}>Vorherige Woche</button>
        <button className="shift-schedule-container-button" onClick={handleNextWeekClick}>Nächste Woche</button>
      </div>
      <table className="shift-schedule-table">
        <thead>
          <tr>
            <th>Name</th>
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i}>{startDate.clone().add(i, "day").locale("DE").format("ddd DD.MM.")}</th>
            ))}
            <th>Stunden/Woche</th>
            <th>Tage/Monat</th>
            <th>Urlaub/Monat</th>
            <th>Krankheit/Monat</th>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            const employeeShifts = shifts.filter(
              (s) => s.employeeId === employee.id && startDate.isSameOrBefore(moment(s.start), "day")
            );

            const shiftHoursPerWeek = calculateShiftHoursPerWeek(employeeShifts);
            const totalShiftDaysPerMonth = calculateShiftDaysPerMonth(employeeShifts);
            const totalShiftHoursPerMonth = calculateHoursPerMonth(employeeShifts);
            const vacationDaysPerMonth = calculateVacationDaysPerMonth(employeeShifts);
            const sickLeaveDaysPerMonth = calculateSickLeaveDaysPerMonth(employeeShifts);

            return (
              <tr key={employee.id}>
                <td>{employee.username}</td>
                {Array.from({ length: 7 }).map((_, i) => {
                  const date = startDate.clone().add(i, "day").format("YYYY-MM-DD");
                  const shift = employeeShifts.find((s) => moment(s.start).format("YYYY-MM-DD") === date);

                  // Determine the CSS class based on shiftType
                  let cellClassName = "";
                  if (shift) {
                    switch (shift.type) {
                      case "Urlaub":
                        cellClassName = "vacation-shift";
                        break;
                      case "Krankheit":
                        cellClassName = "sick-leave-shift";
                        break;
                      default:
                        break;
                    }
                  }

                  return (
                    <td
                      key={i}
                      className={`shift-schedule-table-cell ${cellClassName}`}
                      onClick={() => handleCellClick(employee.id, employee.username, date)}>
                      {shift ? `${formatTimeRange(shift)}` : ""}
                    </td>
                  );
                })}
                <td>{shiftHoursPerWeek}</td>
                <td>{totalShiftDaysPerMonth} ({totalShiftHoursPerMonth})</td>
                <td>{vacationDaysPerMonth}</td>
                <td>{sickLeaveDaysPerMonth}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <div className="shift-indicators">
        <div className="indicator vacation-shift"></div>
        <span>Urlaub</span>
        <div className="indicator sick-leave-shift"></div>
        <span>Krankheit</span>
      </div>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <ShiftForm shift={selectedShift} onSubmit={handleSaveModal} onCancel={handleCloseModal} onDelete={handleDeleteModal} />
      </Modal>
    </div>
  );
};

export default ShiftPlan;