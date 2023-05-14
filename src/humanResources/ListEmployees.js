import React from 'react';
import {useLocation} from "react-router-dom";
import {Table} from "react-bootstrap";
import Button from "react-bootstrap/Button";

const ListEmployees = () => {
    const location = useLocation();
    const {state:employees} = location;
    console.log(employees)

    return    <Table>
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
                    <th><Button>Delete</Button></th>
                </tr>
        ))}
        </tbody>
    </Table>
}

export default ListEmployees;