import React, { useState } from 'react';
import moment from 'moment';
import ShiftForm from './ShiftForm';

import "./ShiftPlan.css"

const ShiftScheduler = () => {
  const [currentDate, setCurrentDate] = useState(moment());
  const [selectedShift, setSelectedShift] = useState(null);
  const [shifts, setShifts] = useState([
    {
      id: 1,
      employee: 'John Doe',
      start: moment().startOf('week').add(1, 'days').add(9, 'hours'),
      end: moment().startOf('week').add(1, 'days').add(17, 'hours'),
    },
    {
      id: 2,
      employee: 'Jane Smith',
      start: moment().startOf('week').add(2, 'days').add(13, 'hours'),
      end: moment().startOf('week').add(2, 'days').add(21, 'hours'),
    },
    {
      id: 3,
      employee: 'Bob Johnson',
      start: moment().startOf('week').add(4, 'days').add(8, 'hours'),
      end: moment().startOf('week').add(4, 'days').add(16, 'hours'),
    },
  ]);

  const handlePrevWeek = () => {
    setCurrentDate(currentDate.clone().subtract(1, 'week'));
  };

  const handleNextWeek = () => {
    setCurrentDate(currentDate.clone().add(1, 'week'));
  };

  const handleSelectShift = (shift) => {
    setSelectedShift(shift);
  };

  const handleEditShift = (id, start, end) => {
    setShifts(
      shifts.map((shift) =>
        shift.id === id ? { ...shift, start, end } : shift
      )
    );
    setSelectedShift(null);
  };

  const handleDeleteShift = (id) => {
    setShifts(shifts.filter((shift) => shift.id !== id));
    setSelectedShift(null);
  };

  const handleCreateShift = (employee, start, end) => {
    setShifts([
      ...shifts,
      {
        id: Math.max(...shifts.map((shift) => shift.id)) + 1,
        employee,
        start,
        end,
      },
    ]);
  };

  const filteredShifts = shifts.filter((shift) =>
    currentDate
      .clone()
      .startOf('week')
      .isSame(shift.start.clone().startOf('week'))
  );

  const weekNumber = currentDate.week();

  const daysOfWeek = Array.from(
    { length: 7 },
    (_, i) => moment().startOf('week').add(i, 'days').format('dddd')
  );

  return (
    <div className="shift-schedule-container">
      <div className="shift-schedule-header">
        <h2>Shift Schedule</h2>
        <div>
          <button onClick={handlePrevWeek}>Previous Week</button>
          <button onClick={handleNextWeek}>Next Week</button>
          <span>Week {weekNumber}</span>
        </div>
      </div>
      <table className="shift-schedule-table">
        <thead>
          <tr>
            <th>Employee</th>
            {daysOfWeek.map((day) => (
              <th key={day}>{day}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {filteredShifts.map((shift) => (
            <tr key={shift.id}>
              <td>{shift.employee}</td>
              {daysOfWeek.map((day) => {
                const dayStart = moment().startOf('week').add(daysOfWeek.indexOf(day), 'days');
                const dayEnd = dayStart.clone().add(24, 'hours');

                if (
                  shift.start.isBetween(dayStart, dayEnd, null, '[]') &&
                  shift.end.isBetween(dayStart, dayEnd, null, '[]')
                ) {
                  return (
                    <td key={day} onClick={() => handleSelectShift(shift)}>
                      {shift.start.format('h:mm A')} - {shift.end.format('h:mm A')}
                    </td>
                  );
                }

                return <td key={day} />;
              })}
            </tr>
          ))}
        </tbody>
      </table>
      {selectedShift ? (
        <ShiftForm
          shift={selectedShift}
          onSubmit={handleEditShift}
          onDelete={handleDeleteShift}
        />
      ) : (
        <ShiftForm onSubmit={handleCreateShift} />
      )}
    </div>
  );
};

export default ShiftScheduler;