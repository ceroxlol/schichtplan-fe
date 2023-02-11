import React, { useState } from "react";
import {
  Button,
  Card,
  Col,
  Container,
  Form,
  Modal,
  Row,
  Table,
} from "react-bootstrap";
import { Toggle } from "rsuite";
import { FaPencilAlt, FaPlus, FaCheck } from "react-icons/fa";


async function fetchAllUsers(token) {
  return fetch('http://0.0.0.0:8080/users/all', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'token': 'Token ' + token
    }
  })
    .then(res =>
      res.json()
    )
}

const UserManagement = () => {
  const defaultUsers = [
    {
      id: 1,
      name: "Bob",
      address: "Dublin",
      age: "26",
      profession: "Software Engineer",
      interestRate: "4",
    },
    {
      id: 2,
      name: "John",
      address: "Galaway",
      age: "24",
      profession: "Software Engineer",
      interestRate: "5",
    },
  ];

  const initCurrentUser = {
    id: null,
    name: "",
    address: "",
    age: "",
    profession: "",
    interestRate: "",
  };

  const [users, setUsers] = useState(defaultUsers);
  const [show, setShow] = useState(false);
  const [newUser, setNewUser] = useState(initCurrentUser);
  const [showCreateBtn, setShowCreateBtn] = useState(true);
  const [editing, setEdit] = useState(false);
  const [rates, setRates] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    if (editing === false) {
      setNewUser(initCurrentUser);
    }
  };

  const onFormSubmit = (newUser) => {
    const id = users.length + 1;
    setUsers([...users, { ...newUser, id }]);
  };

  const onEdit = (newUser) => {
    setEdit(true);
    if (editing === true) {
      setNewUser({ ...newUser, newUser });
      handleShow();
    }

  };

  const onSubmit = (newUser) => {
    if (editing === true) {
      onUpdateUser(newUser);
    } else {
      onFormSubmit(newUser);
    }
  };

  const onUpdateUser = (newUser) => {
    setEdit(false);
    let id = newUser.id;
    setUsers(users.map((i) => (i.id === id ? newUser : i)));
  };

  const onDeleteUser = (currentUser) => {
    setUsers(users.filter((i) => i.id !== currentUser.id));
  };

  const onActivateUser = async (currentUser) => {

  }

  return (
    <Container fluid="md">
      <Row>
        <Col>
          <Card className="customCard">
            <Card.Body>
              <div className="d-flex justify-content-between customCardBody">
                <div>
                  <Card.Title>Benutzerverwaltung</Card.Title>
                </div>
                <div className="d-flex">
                  <Toggle
                    className="userToggleBtn"
                    checked={showCreateBtn}
                    onClick={(e) => {
                      e.preventDefault();
                      setShowCreateBtn(!showCreateBtn);
                    }}
                  />
                  {showCreateBtn ? (
                    <Button
                      variant="primary"
                      onClick={handleShow}
                      title="Add User"
                    >
                      <FaPlus />
                    </Button>
                  ) : (
                    ""
                  )}
                </div>
              </div>
              <Table striped bordered hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Rolle</th>
                    <th>Aktiviert</th>
                  </tr>
                </thead>
                <tbody>
                  {users.length > 0 ? (
                    users.map((user, index) => (
                      <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.username}</td>
                        <td>{user.email}</td>
                        <td>{user.role}</td>
                        <td>{user.activated}</td>
                        <td>
                          <Button
                            variant="info"
                            title="Editieren"
                            onClick={() => onEdit(user)}
                          >
                            <FaPencilAlt />
                          </Button>{" "}
                          <Button
                            variant="success"
                            title="Aktivieren"
                            onClick={() => onDeleteUser(user)}
                          >
                            <FaCheck />
                          </Button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan={6} className="text-center">
                        No users found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </Table>
            </Card.Body>
          </Card>

          <Modal size="lg" show={show} onHide={handleClose}>
            <Form
              onSubmit={(e) => {
                e.preventDefault();
                onSubmit(newUser);
              }}
            >
              <Modal.Header closeButton>
                {
                  editing === true
                    ? <Modal.Title>Edit User</Modal.Title>
                    : <Modal.Title>Add User</Modal.Title>
                }
              </Modal.Header>
              <Modal.Body>
                <Form.Group className="mb-3" controlId="formBasicName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.name}
                    required
                    onChange={(e) =>
                      setNewUser({ ...newUser, name: e.target.value })
                    }
                    placeholder="Enter Name"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAddress">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.address}
                    onChange={(e) =>
                      setNewUser({ ...newUser, address: e.target.value })
                    }
                    placeholder="Enter Address"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicAge">
                  <Form.Label>Age</Form.Label>
                  <Form.Control
                    type="number"
                    value={newUser.age}
                    onChange={(e) =>
                      setNewUser({ ...newUser, age: e.target.value })
                    }
                    placeholder="Enter Age"
                  />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicProfession">
                  <Form.Label>Profession</Form.Label>
                  <Form.Control
                    type="text"
                    value={newUser.profession}
                    onChange={(e) =>
                      setNewUser({ ...newUser, profession: e.target.value })
                    }
                    placeholder="Enter Profession"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Sport Interest Rate</Form.Label>
                  <Form.Select
                    value={newUser.interestRate}
                    onChange={(e) =>
                      setNewUser({ ...newUser, interestRate: e.target.value })
                    }
                  >
                    <option value="">Select</option>
                    {rates.length
                      ? rates.map((val, index) => (
                        <option key={index} value={val}>
                          {val}
                        </option>
                      ))
                      : null}
                  </Form.Select>
                </Form.Group>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                  Close
                </Button>
                {editing === true ? (
                  <Button variant="primary" type="submit" onClick={handleClose}>
                    Update
                  </Button>
                ) : (
                  <Button variant="primary" disabled={!newUser.name} type="submit" onClick={handleClose}>
                    Submit
                  </Button>
                )}
              </Modal.Footer>
            </Form>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default UserManagement;