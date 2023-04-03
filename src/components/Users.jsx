import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import userService from "../services/user";
import "./Users.css";

function Users() {
  const [employees, setEmployees] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsersData = async () => {
      const response = await userService.getAllUsers();
      const data = Array.isArray(response.data) ? response.data : [response.data];
      setEmployees(data)
      console.log(data)
    }

    fetchUsersData();
  }, []);

  const handleAddEmployee = () => {
    navigate('/users/add');
  }

  return (
    <div className="users-list-container">
      <div className="users-list-header">
        <h2>Employee List</h2>
      </div>
      <div className="users-list-body">
        <table className="users-list-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Action</th>
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
      <div className="users-list-footer">
        <button onClick={handleAddEmployee}>Add new employee</button>
      </div>
    </div>
  );
}

export default Users;
