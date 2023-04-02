import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import userService from "../services/user";

import "./UserForm.css";

const roles = ["HEIMLEITUNG", "MITARBEITER"];

const UserForm = () => {
  const { id } = useParams();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [activated, setActivated] = useState(false);

    useEffect(() => {
    const fetchUsersData = async () => {
      const response = await userService.getUser(id);
      const data = await response.data;
      console.log(data);
      setEmail(data.email);
      setUsername(data.username);
      setRole(data.role);
      setActivated(data.activated);
    }

    fetchUsersData();
  }, [id]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    const user = {
      email,
      username,
      password,
      role,
      activated,
    };
    console.log(user); // Just for demonstration purposes
    // You can call an onSubmit function here to pass the user data to the parent component
  };

  return (
    <form className='form-container form-body' onSubmit={handleSubmit}>
      <div className='form-header'>
        <h2>Mitarbeiter editieren</h2>
      </div>
      <div>
      <label htmlFor="email">Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div>
        <label>Username:</label>
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </div>
      <div>
      <label htmlFor="password">Password:</label>
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div>
      <label htmlFor="role">Role:</label>
        <select value={role} onChange={handleRoleChange}>
          <option value="">Select a role</option>
          <option value="HEIMLEITUNG">HEIMLEITUNG</option>
          <option value="MITARBEITER">MITARBEITER</option>
        </select>
      </div>
      <div>
      <label htmlFor="activated">Activated:</label>
        <input type="checkbox" checked={activated} onChange={(e) => setActivated(e.target.checked)} />
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;