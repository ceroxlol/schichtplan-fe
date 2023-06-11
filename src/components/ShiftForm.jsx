import React, { useState, useEffect } from 'react';
import moment from 'moment';

import "./Form.css"

const types = ["Normal", "Urlaub", "Krankheit"];

const ShiftForm = ({ shift, onSubmit, onCancel, onDelete }) => {
  const [employeeId, setEmployeeId] = useState('');
  const [employeeName, setEmployeeName] = useState('');
  const [start, setStart] = useState(moment());
  const [end, setEnd] = useState(moment());
  const [type, setType] = useState('');

  const [isNewShift, setIsNewShift] = useState(false);

  const [pause, setPause] = useState("");

  useEffect(() => {
    const calculatePause = () => {
      const duration = moment.duration(end.diff(start)).asHours();
  
      if (duration < 6) {
        setPause("Keine Pause");
      } else if (duration < 8) {
        setPause("30 Minuten Pause");
      } else {
        setPause("45 Minuten Pause");
      }
    };

    setPause(calculatePause);
  }, [start, end]);

  useEffect(() => {
    setIsNewShift(shift.start === null && shift.end === null);
    setEmployeeId(shift.employeeId);
    setEmployeeName(shift.employeeName);
    setStart(shift.start ? moment(shift.start) : moment(shift.date, 'YYYY-MM-DD').startOf('day').set('hour', 9));
    setEnd(shift.end ? moment(shift.end) : moment(shift.date, 'YYYY-MM-DD').startOf('day').set('hour', 18));
    setType(shift.type)
    console.log(shift)
  }, [shift]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(employeeId, start, end, type);
  };

  const handleDelete = (e) => {
    e.preventDefault();
    onDelete(shift.id);
  };

  const handleCancel = (e) => {
    e.preventDefault();
    onCancel();
  };

  const handleTypeChange = (e) => {
    setType(e.target.value);
    console.log(e.target.value);
  };

  return (
    <form className='form-container form-body' onSubmit={handleSubmit}>
      <div className='form-header'>
        <h2>{isNewShift ? 'Neue Schicht anlegen' : 'Schicht editieren'}</h2>
      </div>
      <div>
        <label htmlFor="employee-input">Mitarbeiter:</label>
        <input id="employee-input" type="text" value={employeeName} disabled onChange={(e) => setEmployeeId(e.target.value)} />
      </div>
      <div>
        <label htmlFor="start-input">Beginn:</label>
        <input id="start-input" type="datetime-local" step={300} value={start.format('YYYY-MM-DDTHH:mm')} onChange={(e) => setStart(moment(e.target.value))} />
      </div>
      <div>
        <label htmlFor="end-input">Ende:</label>
        <input id="end-input" type="datetime-local" value={end.format('YYYY-MM-DDTHH:mm')} onChange={(e) => setEnd(moment(e.target.value))} />
      </div>
      <div>
        <label htmlFor="type-input">Typ:</label>
        <select value={type} onChange={handleTypeChange}>
          {types.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
      </div>
      {shift.type === "Normal" && (
        <div>
          <label>Pause: </label>
          <span>{pause}</span>
        </div>
      )}
      <div className="form-buttons">
        <button type="submit">Speichern</button>
        {!isNewShift && <button type="button" onClick={handleDelete} className='form-delete-button'>Löschen</button>}
        <button type="button" onClick={handleCancel} className='form-cancel-button'>Abbrechen</button>
      </div>
    </form>
  );
};

export default ShiftForm;
