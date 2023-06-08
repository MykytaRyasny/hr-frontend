import React from 'react';
import {useLocation, useNavigate} from "react-router-dom";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import NavBar from "./NavBar";
import api from './AxiosConfig'
import {userDetail} from "./LoginForm";

const ListEmployees = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const {state: employees} = location;

    const handleDelete = async (event, dni) => {
        event.preventDefault();
        try {
            await api.delete(`/employee/delete/${dni}`)
            await api
                .get('/employee/all')
                .then(response => navigate('/employees', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };
    const handleModify = async (event, dni) => {
        event.preventDefault();
        try {
            await api.get(`/employee/find/${dni}`)
                .then(response => navigate('/newemployee', {state: response.data}))
                .catch((error => console.log(error)))
        } catch (error) {
            console.log(error)
        }
    }

    function getThModify(employee) {
        return <th><Button onClick={(event) => handleModify(event, employee.dni)}>Modify</Button></th>;
    }

    function getThDelete(employee) {
        return <th><Button onClick={(event) => handleDelete(event, employee.dni)}>Delete</Button></th>;
    }

    return <>
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
                    {userDetail.rol === "admin" || userDetail.rol === "hr" ? getThModify(employee) : null}
                    {userDetail.rol === "admin" || userDetail.rol === "hr" ? getThDelete(employee) : null}
                </tr>
            ))}
            </tbody>
        </Table>
    </>
}

export default ListEmployees;