import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import "bootstrap/dist/css/bootstrap.min.css"

import './App.css';
import Login from './components/login.component';
import Dashboard from './components/dashboard.component';
import Preferences from './components/preferences.component';
import useToken from './useToken';
import { Menu } from './components/userManagement.component';

function App() {

  const { token, setToken } = useToken();

  if(!token){
    return <Login setToken={setToken}/>
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route path='dashboard' element={<Dashboard />} />
        <Route path='preferences' element={<Preferences />} />
        <Route path='usermanagement' element={<Menu />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App;