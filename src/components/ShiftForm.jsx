import React, { useState, useEffect } from 'react';
import moment from 'moment';

import "./ShiftPlan.css"

const ShiftForm = ({ shift, onSubmit, onCancel, onDelete }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());

  const [isNewShift, setIsNewShift] = useState(false);

  useEffect(() => {
    setIsNewShift(shift.start === null && shift.end === null);
    setEmployeeId(shift.employeeId);
    setEmployeeName(shift.employeeName);
    setStart(shift.start ? moment(shift.start) : moment(shift.date, 'YYYY-MM-DD').startOf('day').set('hour', 9));
    setEnd(shift.end ? moment(shift.end) : moment(shift.date, 'YYYY-MM-DD').startOf('day').set('hour', 18));
  }, [shift]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employeeId, start, end);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(shift.id);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };



  return (
    <form className='shift-form-container shift-form-body' onSubmit={handleSubmit}>
      <div className='shift-form-header'>
        <h2>{isNewShift ? 'Neue Schicht anlegen' : 'Schicht editieren'}</h2>
      </div>
      <div>
        <label htmlFor="employee-input">Mitarbeiter:</label>
        <input id="employee-input" type="text" value={employeeName} onChange={(e) => setEmployeeId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="start-input">Beginn:</label>
        <input id="start-input" type="datetime-local" step={300} value={start.format('YYYY-MM-DDTHH:mm')} onChange={(e) => setStart(moment(e.target.value))} />
      </div>
      <div>
        <label htmlFor="end-input">Ende:</label>
        <input id="end-input" type="datetime-local" value={end.format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEnd(moment(e.target.value))} />
      </div>
      <div className="shift-form-buttons">
        <button type="submit">Speichern</button>
        {!isNewShift && <button type="button" onClick={handleDelete} className='shift-form-delete-button'>Löschen</button>}
        <button type="button" onClick={handleCancel}>Abbrechen</button>
      </div>
    </form>
  );
};

export default ShiftForm;
