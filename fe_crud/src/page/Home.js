import React, { useState, useEffect, Fragment } from "react";
import Table from "react-bootstrap/Table";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import {
  getEmployees,
  addEmployee,
  deleteEmployee,
  editEmployee,
  getDetailEmployee,
} from "../config/api";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// const emdata = [
//   { id: 1, name: "Viet Anh", age: 24, isActive: 1 },
//   { id: 2, name: "Duy", age: 15, isActive: 1 },
// ];
const Home = () => {
  const [data, setData] = useState([]);
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const [name, setName] = useState("");
  const [age, setAge] = useState("");
  const [isActive, setIsActive] = useState(false);

  console.log("is active", isActive);

  const [setID, setEditId] = useState("");
  const [editName, setEditName] = useState("");
  const [editAge, setEditAge] = useState("");
  const [editIsActive, setEditIsActive] = useState(0);

  const ListEmployees = async () => {
    const res = await getEmployees();
    console.log("check res", res);

    setData(res);
  };
  useEffect(() => {
    ListEmployees();
  }, []);

  const handleCreate = async () => {
    const dataEmployee = {
      name: name,
      age: age,
      isActive: isActive ? 1 : 0,
    };

    if (!name || !age) {
      toast.error("create failed !");
    } else {
      await addEmployee(dataEmployee);
      toast.success("create success!");
      ListEmployees();
      handleClearData();
    }
  };

  const handleEdit = async (id) => {
    // alert(id);
    handleShow();
    const res = await getDetailEmployee(id);
    setEditId(res.id);
    setEditAge(res.age);
    setEditName(res.name);
    setEditIsActive(res.isActive);
  };
  const handleDelete = async (id) => {
    if (window.confirm("Bạn có muốn xóa employee này không ?") === true) {
      await deleteEmployee(id);
      ListEmployees();
    }
    // alert(id);
  };
  const handleUpdate = async () => {
    const dataEdit = {
      id: setID,
      name: editName,
      age: editAge,
      isActive: editIsActive ? 1 : 0,
    };
    console.log("check edit data", dataEdit);
    await editEmployee(dataEdit);
    ListEmployees();
    handleClose();
    handleClearData();
  };

  const handleClearData = () => {
    setAge("");
    setName("");
    setIsActive(false);
    setEditAge("");
    setEditId("");
    setEditName("");
    setEditIsActive(false);
  };

  return (
    <Fragment>
      <Container className="bg-light m-4 p-3">
        <Row>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="text"
              className="form-control"
              placeholder="Enter Age"
              value={age}
              onChange={(e) => setAge(e.target.value)}
            />
          </Col>
          <Col>
            <input
              type="checkbox"
              checked={isActive}
              onChange={(e) => setIsActive(e.target.checked)}
              value={isActive}
            />
            <label>IsActive</label>
          </Col>
          <Col>
            <button className="btn btn-primary" onClick={handleCreate}>
              Submit
            </button>
          </Col>
        </Row>
      </Container>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Age</th>
            <th>isActive</th>
          </tr>
        </thead>
        <tbody>
          {data && data?.length > 0 ? (
            data.map((item, index) => {
              return (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.age}</td>
                  <td>{item.isActive}</td>
                  <td colSpan={2}>
                    <button
                      onClick={() => handleEdit(item.id)}
                      className="btn btn-primary">
                      Edit
                    </button>{" "}
                    &nbsp;
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="btn btn-danger">
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })
          ) : (
            <div>Loading ...</div>
          )}
        </tbody>
      </Table>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal Update Employee</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Name"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="text"
                className="form-control"
                placeholder="Enter Age"
                value={editAge}
                onChange={(e) => setEditAge(e.target.value)}
              />
            </Col>
            <Col>
              <input
                type="checkbox"
                checked={editIsActive}
                onChange={(e) => setEditIsActive(e.target.checked)}
                value={editIsActive}
              />
              <label>IsActive</label>
            </Col>
            {/* <Col>
              <button className="btn btn-primary">Submit</button>
            </Col> */}
          </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleUpdate}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />
    </Fragment>
  );
};
export default Home;
