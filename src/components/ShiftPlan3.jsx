import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import Modal from "react-modal";

import userService from "../services/user";
import shiftService from "../services/shift";
import ShiftForm from "./ShiftForm";

import "./ShiftPlan.css"

import 'moment/locale/de';

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
    const selectedShift = {
      employeeId,
      employeeName,
      date,
      start: null,
      end: null,
      ...shift,
    };
    setSelectedShift(selectedShift);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleSaveModal = async (employeeId, start, end) => {
    setIsModalOpen(false);
    try {
      const formattedStart = moment(start).toISOString();
      const formattedEnd = moment(end).toISOString();
      const title = formatTimeRange(start, end);
      const index = shifts.findIndex((s) => s.employeeId === employeeId && moment(s.start).isSame(moment(start), 'day'));
      if (index === -1) {
        var newShift = { id: null, employeeId, title: title, start: formattedStart, end: formattedEnd };
        const response = await shiftService.upsertShift(newShift);
        newShift.id = response.data.id;
        setShifts(prevShifts => [...prevShifts, newShift]);
      } else {
        const shiftToUpdate = shifts[index];
        const updatedShift = { ...shiftToUpdate, title: title, start: formattedStart, end: formattedEnd };
        await shiftService.upsertShift(updatedShift);
        shifts.splice(index, 1, updatedShift);
        setShifts([...shifts]);
      }
    } catch (error) {
      console.error(error);
    }
  };

  function formatTimeRange(start, end) {
    return moment(start).format("HH:mm") + " - " + moment(end).format("HH:mm");
  }

  const handleDeleteModal = async () => {
    setIsModalOpen(false);
    console.log("delete shift")
    try {
      await shiftService.deleteShift(selectedShift.id);
      setShifts(shifts.filter(shift => shift.id !== selectedShift.id));
    } catch (error) {
      // Handle error
    }
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
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => (
            <tr key={employee.id}>
              <td>{employee.username}</td>
              {Array.from({ length: 7 }).map((_, i) => {
                const date = startDate.clone().add(i, "day").format("YYYY-MM-DD");
                const shift = shifts.find((s) => s.employeeId === employee.id && moment(s.start).format("YYYY-MM-DD") === date);
                return (
                  <td key={i} onClick={() => handleCellClick(employee.id, employee.username, date)}>
                    {shift ? `${shift.title}` : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <ShiftForm shift={selectedShift} onSubmit={handleSaveModal} onCancel={handleCloseModal} onDelete={handleDeleteModal} />
      </Modal>
    </div>
  );
};

export default ShiftPlan;