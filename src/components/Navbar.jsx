import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, useLocation, NavLink, Link } from 'react-router-dom';
import auth from "../services/auth";
import { useEffect } from "react";

export default function SchichtplanNavbar() {

  const navigate = useNavigate();
  const location = useLocation();
  const user = auth.getCurrentUser();

  useEffect(() => {
    if ((!user || !user.token || !user.id) && !location.pathname === "/") {
      navigate("/login")
    }
  }, [user, navigate, location.pathname]);

  function logout() {
    auth.logout()
    navigate("/login")
  }

  if (user && user.token && user.id) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">Schichtplan</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link as={Link} to={`/shiftplan/${user.id}`}>Mein Schichtplan</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/shiftplan/all`}>Gesamter Schichtplan</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/users`}>Nutzerübersicht</Nav.Link>
          </Nav.Item>
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link onClick={() => logout()}>Logout</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar>
    )
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">Schichtplan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          {user && user.token &&
            <Nav.Item>
              <Nav.Link as={Link} to={`/shiftplan/${user.id}`}>Mein Schichtplan</Nav.Link>
            </Nav.Item>
            &&
            <Nav.Item>
              <Nav.Link as={Link} to={`/shiftplan/all`}>Gesamter Schichtplan</Nav.Link>
            </Nav.Item>
          }
        </Nav>
        <Nav>
          {!user &&
            <Nav.Item>
              <Nav.Link href="/login">Login</Nav.Link>
            </Nav.Item>
          }{!user &&
            <Nav.Item>
              <Nav.Link href="/register">Register</Nav.Link>
            </Nav.Item>
          }
          {
            user && user.token &&
            <Nav.Item>
              <Nav.Link href="/logout">Logout</Nav.Link>
            </Nav.Item>
          }
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}