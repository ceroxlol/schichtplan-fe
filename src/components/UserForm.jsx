import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from 'react-router-dom';

import userService from "../services/user";

import "./Form.css";

const roles = ["HEIMLEITUNG", "MITARBEITER"];

const UserForm = () => {
  const { id } = useParams();

  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('');
  const [activated, setActivated] = useState(false);

  useEffect(() => {
    if (id) {
      const fetchUserData = async () => {
        const response = await userService.getUser(id);
        const data = await response.data;
        setEmail(data.email);
        setUsername(data.username);
        setPassword(data.password);
        setRole(data.role);
        setActivated(data.activated);
      }
      fetchUserData();
    }
  }, [id]);

  const handleRoleChange = (e) => {
    setRole(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const user = {
      id,
      email,
      username,
      password,
      role,
      activated,
    };
    try {
      const response = await userService.updateUser(user);
      if (response.status === 200) {
        if (id) {
          toast.success("Nutzer aktualisiert.")
        }
        else {
          toast.success("Neuen Nutzer angelegt.")
          navigate("/users")
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Etwas lief schief...")
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    navigate(`/users`)
  };


  return (
    <form className='form-container' onSubmit={handleSubmit}>
      <div className="form-body">
        <div className='form-header'>
          <h2>{id ? 'Mitarbeiter editieren' : 'Mitarbeiter anlegen'}</h2>
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
          <input type="password" disabled value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <div>
          <label htmlFor="role">Role:</label>
          <select value={role} onChange={handleRoleChange}>
            <option value="">Select a role</option>
            {roles.map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor="activated">Activated:</label>
          <input type="checkbox" checked={activated} onChange={(e) => setActivated(e.target.checked)} />
        </div>
        <div>
          <button type="submit">Speichern</button>
          <button type="button" className='form-cancel-button' onClick={handleCancel}>Abbrechen</button>
        </div>
      </div>
    </form>
  );
};

export default UserForm;
