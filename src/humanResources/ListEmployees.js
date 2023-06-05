import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "./NavBar";
import axios from "axios";

const ListEmployees = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state:employees} = location;

    const handleDelete = async (event, dni) => {
        event.preventDefault();
        axios.defaults.baseURL = 'http://127.0.0.1:8080';
        try {
            await axios.delete(`/employee/delete/${dni}`)
            await axios
                .get('/employee/all')
                .then(response => navigate('/employees', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };

    return    <>
        <NavBar></NavBar>
        <Table>
            <thead>
                <tr>
                    <th>First Name</th>
                    <th>Last Name</th>
                    <th>Username</th>
                    <th></th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
            {employees.map(employee => (
                    <tr key={employee.dni}>
                        <td>{employee.firstName}</td>
                        <td>{employee.lastName}</td>
                        <td>{employee.username}</td>
                        <th><Button>Modify</Button></th>
                        <th><Button onClick={(event) => handleDelete(event, employee.dni)}>Delete</Button></th>
                    </tr>
            ))}
            </tbody>
        </Table>
    </>
}

export default ListEmployees;