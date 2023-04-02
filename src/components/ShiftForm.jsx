import React, { useState, useEffect } from 'react';
import moment from 'moment';

import "./ShiftPlan.css"

const ShiftForm = ({ shift, onSubmit, onCancel }) => {
  const [employeeId, setEmployee] = useState(shift?.employeeId || '');
  const [employeeName, setEmployeeName] = useState(shift?.employeeName || '');
  const [start, setStart] = useState(shift?.start || moment());
  const [end, setEnd] = useState(shift?.end || moment().add(8, 'hours'));

  useEffect(() => {
    if (shift) {
      setEmployee(shift.employeeId);
      setStart(shift?.start || moment());
      setEnd(shift?.end || moment().add(8, 'hours'));
    } else {
      setEmployee('');
      setStart(moment().startOf('hour').add(9, 'hours'));
      setEnd(moment().startOf('hour').add(17, 'hours'));
    }
  }, [shift]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employeeId, start, end);
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
        <input id="employee-input" type="text" value={employeeName} onChange={(e) => setEmployee(e.target.value)} />
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
        <button type="button" onClick={handleCancel}>Cancel</button>
      </div>
    </form>
  );
};

export default ShiftForm;
