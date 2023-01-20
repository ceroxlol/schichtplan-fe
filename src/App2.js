import React, { Component } from "react";
import { Routes, Route, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import AuthService from "./services/auth.service";

import Login from "./components/login2.component";
import Register from "./components/register.component";
import UserManagement from "./components/userManagement2.component";
import BoardUser from "./components/board-user.component";

class App extends Component {
  constructor(props) {
    super(props);
    this.logOut = this.logOut.bind(this);

    this.state = {
      showUserManagement: false,
      currentUser: undefined,
    };
  }

  componentDidMount() {
    const user = AuthService.getCurrentUser();

    if (user) {
      this.setState({
        currentUser: user,
        showUserManagement: user.roles.includes("HEIMLEITUNG")
      });
    }
  }

  logOut() {
    AuthService.logout();
    this.setState({
      showUserManagement: false,
      currentUser: undefined,
    });
  }

  render() {
    const { currentUser, showUserManagement: showUserManagement } = this.state;

    return (
      <div>
        <nav className="navbar navbar-expand">
          <Link to={"/"} className="navbar-brand">
            bezKoder
          </Link>
          <div className="navbar-nav mr-auto">
            {showUserManagement && (
              <li className="nav-item">
                <Link to={"/admin/usermanagement"} className="nav-link">
                  UserManagement
                </Link>
              </li>
            )}

            {currentUser && (
              <li className="nav-item">
                <Link to={"/user"} className="nav-link">
                  User
                </Link>
              </li>
            )}
          </div>

          {currentUser ? (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <a href="/login" className="nav-link" onClick={this.logOut}>
                  LogOut
                </a>
              </li>
            </div>
          ) : (
            <div className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link to={"/login"} className="nav-link">
                  Login
                </Link>
              </li>

              <li className="nav-item">
                <Link to={"/register"} className="nav-link">
                  Sign Up
                </Link>
              </li>
            </div>
          )}
        </nav>

        <div className="container mt-3">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/user" element={<BoardUser />} />
              <Route path="/admin" element={<UserManagement />} />
            </Routes>
        </div>
      </div>
    );
  }
}

export default App;