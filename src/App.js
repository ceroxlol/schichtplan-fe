import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import Login from './components/Login/Login';
import Dashboard from './components/Dashboard/Dashboard';
import Preferences from './components/Preferences/Preferences';
import useToken from './useToken';

function App() {
  
  const { token, setToken } = useToken();

  if(!token){
    return <Login setToken={setToken}/>
  }

  return (
      <BrowserRouter>
        <Routes>
          <Route path="dashboard" element={<Dashboard />} />
          <Route path='preferences' element={<Preferences />}/>
        </Routes>
      </BrowserRouter>
  )
}
  
export default App;