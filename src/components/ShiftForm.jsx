import React, { useState, useEffect } from 'react';
import moment from 'moment';

import "./ShiftPlan.css"

const ShiftForm = ({ shift, onSubmit, onCancel, onDelete }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());

  useEffect(() => {
    if(shift){
    setEmployeeId(shift.employeeId);
    setEmployeeName(shift.employeeName);
    setStart(shift?.start ? moment(shift.start) : moment(shift.date, 'YYYY-MM-DD').startOf('day').set('hour', 9));
    setEnd(shift?.end ? moment(shift.end) : moment(shift.date, 'YYYY-MM-DD').startOf('day').set('hour', 18));}
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
        <h2>{shift ? 'Edit Shift' : 'Add Shift'}</h2>
      </div>
      <div>
        <label htmlFor="employee-input">Employee:</label>
        <input id="employee-input" type="text" value={employeeName} onChange={(e) => setEmployeeId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="start-input">Start:</label>
        <input id="start-input" type="datetime-local" value={start.format('YYYY-MM-DDTHH:mm')} onChange={(e) => setStart(moment(e.target.value))} />
      </div>
      <div>
        <label htmlFor="end-input">End:</label>
        <input id="end-input" type="datetime-local" value={end.format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEnd(moment(e.target.value))} />
      </div>
      <div>
        <button type="submit">{shift ? 'Update' : 'Create'}</button>
        {shift && <button type="button" onClick={handleDelete} className='shift-form-delete-button'>Delete</button>}
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ShiftForm;
