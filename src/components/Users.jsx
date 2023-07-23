import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import users from "../services/user";
import "./Users.css";

function Users() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await users.getAllUsers();
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setEmployees(data)
    }

    fetchUsersData();
  }, []);

  const handleAddEmployee = () => {
    navigate('/users/add');
  }

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h2>Mitarbeiterverzeichnis</h2>
      </div>
      <div className="users-list-body">
        <table className="users-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Rolle</th>
            </tr>
          </thead>
          <tbody>
            {employees.map(employee => (
              <tr key={employee.id} className="users-list-row" onClick={() => navigate(`/users/${employee.id}/administration`)}>
                <td>{employee.username}</td>
                <td>{employee.email}</td>
                <td>{employee.role}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="users-list-footer">
        <button onClick={handleAddEmployee}>Neuen Mitarbeiter hinzufügen</button>
      </div>
    </div>
  );
}

export default Users;
