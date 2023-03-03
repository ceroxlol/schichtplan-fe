import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import Home from "./components/Home";
import SchichtplanNavbar from "./components/Navbar";
import Register from "./components/Register";
import ShiftPlan from "./components/ShiftPlan";

export default function App() {
  return (
    <BrowserRouter>
      <SchichtplanNavbar></SchichtplanNavbar>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register/>} />
        {/* <Route path="/usermanagement" element={<UserManagement />} /> */}
        <Route path="/shiftplan" element={<ShiftPlan/>} />
        <Route path="/shiftplan/all" element={<ShiftPlan/>} />
        <Route path="/logout" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}