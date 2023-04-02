import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Modal from "react-modal";

import userService from "../services/user";
import shiftService from "../services/shift";
import ShiftForm from "./ShiftForm";

import "./ShiftPlan.css"

Modal.setAppElement("#root");

const ShiftPlan = () => {
  const navigate = useNavigate();
  const [startDate, setStartDate] = useState(moment().startOf("week"));
  const [employees, setEmployees] = useState([]);
  const [shifts, setShifts] = useState([]);
  const [selectedShift, setSelectedShift] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await userService.getAllUsers();
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setEmployees(data)
    }

    fetchUsersData();
  }, []);

  useEffect(() => {
    const fetchScheduleData = async () => {
      try {
        const response = await shiftService.getAllShiftPlans();
        const data = await response.data;
        setShifts(data);
        console.log(data);
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
  }, [navigate])

  const handlePrevWeekClick = () => {
    setStartDate(startDate.clone().subtract(1, "week"));
  };

  const handleNextWeekClick = () => {
    setStartDate(startDate.clone().add(1, "week"));
  };

  const handleCellClick = (employeeId, date) => {
    const shift = shifts.find((s) => s.employeeId === employeeId && moment(s.start).format("YYYY-MM-DD") === date);
    setSelectedShift(shift || { employeeId, date, start: "", end: "" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setSelectedShift(null);
    setIsModalOpen(false);
  };

  const handleSaveModal = (shift) => {
    console.log("Saving shift:", shift);
    setIsModalOpen(false);
    setShifts((prevShifts) => {
      const index = prevShifts.findIndex((s) => s.id === shift.id);
      if (index === -1) {
        // Shift not found in the previous array, add it
        return [...prevShifts, shift];
      } else {
        // Shift found in the previous array, update it
        const updatedShifts = [...prevShifts];
        updatedShifts[index] = shift;
        return updatedShifts;
      }
    });
  };

  return (
    <div className="shift-schedule-container">
      <div className="shift-schedule-header">
        <h2>Shift Schedule</h2>
        <div>
          <button className="shift-schedule-header-button" onClick={handlePrevWeekClick}>Prev Week</button>
          <button className="shift-schedule-header-button" onClick={handleNextWeekClick}>Next Week</button>
        </div>
      </div>
      <table className="shift-schedule-table">
        <thead>
          <tr>
            <th></th>
            {Array.from({ length: 7 }).map((_, i) => (
              <th key={i}>{startDate.clone().add(i, "day").format("MMM DD")}</th>
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
                  <td key={i} onClick={() => handleCellClick(employee.id, date)}>
                    {shift ? `${shift.title}` : ""}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
      <Modal isOpen={isModalOpen} onRequestClose={handleCloseModal}>
        <ShiftForm shift={selectedShift} onSubmit={handleSaveModal} onCancel={handleCloseModal} />
      </Modal>
    </div>
  );
};

export default ShiftPlan;