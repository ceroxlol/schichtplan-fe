import { Navbar, Nav } from "react-bootstrap";
import { NavLink } from 'react-router-dom';
import auth from "../services/auth";

export default function SchichtplanNavbar() {

  const user = auth.getCurrentUser()
  if(user){
    console.log(user.user)
  }

  return (
    <Navbar bg="light" expand="lg">
      <Navbar.Brand as={NavLink} to="/">Schichtplan</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          {user.user && user.user.token &&
          <Nav.Item>
            <Nav.Link href="/usermanagement">Benutzerverwaltung</Nav.Link>
          </Nav.Item>
          }
        </Nav>
        <Nav>
          <Nav.Item>
            <Nav.Link href="/login">Login</Nav.Link>
          </Nav.Item>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}