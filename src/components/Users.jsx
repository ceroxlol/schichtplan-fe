import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import userService from "../services/user";
import "./Users.css";

function Users() {
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await userService.getAllUsers();
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setEmployees(data)
      console.log(data)
    }

    fetchUsersData();
  }, []);

  return (
    <div className="users-list-container">
      <h1>Employee List</h1>
      <table className="users-list-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {employees.map(employee => (
            <tr key={employee.id} className="users-list-row">
              <td>{employee.username}</td>
              <td>{employee.email}</td>
              <td>{employee.role}</td>
              <td>
                <Link to={`/users/${employee.id}/administration`}>Edit</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Users;
