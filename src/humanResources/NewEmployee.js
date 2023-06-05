import NavBar from "./NavBar";
import React, {useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import axios from "axios";
import {useNavigate} from 'react-router-dom';
function NewEmployee(){
    const [dni, setDNI] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.defaults.baseURL = 'http://127.0.0.1:8080';
        try {
            await axios.post('/employee/new',
                {
                    dni,
                    firstName,
                    lastName,
                    role
                })
            await axios
                .get('/employee/all')
                .then(response => navigate('/employees', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <>
            <NavBar></NavBar>
            <Form style={{paddingLeft:"24px"}} onSubmit={handleSubmit} >
                <Form.Group className="mb-3" controlId="formDNI">
                    <Form.Label>DNI</Form.Label>
                    <Form.Control required={true} type="text" placeholder="DNI"
                                  value={dni} onChange={(e) => setDNI(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formFirstName">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control required={true} type="text" placeholder="First name"
                                  value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formLastName">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control required={true} type="text" placeholder="Last Name"
                                  value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                </Form.Group>
                <Form.Group className="mb-3" controlId="formRole">
                    <Form.Label>Role</Form.Label>
                    <Form.Select required={true} onChange={e => setRole(e.target.value)} aria-label="Default select example">
                        <option value="" disabled selected hidden>Select role</option>
                        <option value="hr">Human Resources</option>
                        <option value="shop_vendor">Shop Vendor</option>
                        <option value="shop_manager">Shop Manager</option>
                    </Form.Select>
                </Form.Group>
                <Button variant="primary" type="submit">
                    Create
                </Button>
            </Form>
        </>
    )
}

export default NewEmployee;