import { Navbar, Nav } from "react-bootstrap";
import { useNavigate, NavLink, Link } from 'react-router-dom';
import auth from "../services/auth";

export default function SchichtplanNavbar() {

  const navigate = useNavigate();
  const user = auth.getCurrentUser();

  function logout() {
    auth.logout()
    navigate("/login")
  }

  if (user && user.token) {
    return (
      <Navbar bg="light" expand="lg">
        <Navbar.Brand as={NavLink} to="/">Schichtplan</Navbar.Brand>
        <Nav className="me-auto">
          <Nav.Item>
            <Nav.Link as={Link} to="/home">Home</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link as={Link} to={`/shiftplan/${user.userId}`}>Mein Schichtplan</Nav.Link>
          </Nav.Item>
          <Nav.Item>
            <Nav.Link href="/shiftplan/all">Schichtplan</Nav.Link>
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
          <Nav.Item>
            <Nav.Link href="/home">Home</Nav.Link>
          </Nav.Item>
          {user && user.token &&
            <Nav.Item>
              <Nav.Link href="/shiftplan">Mein Schichtplan</Nav.Link>
            </Nav.Item>
            &&
            <Nav.Item>
              <Nav.Link href="/shiftplan/all">Schichtplan</Nav.Link>
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