import NavBar from "./NavBar";
import React, {useEffect, useState} from 'react'
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import api from './AxiosConfig'
import {useLocation, useNavigate} from 'react-router-dom';
import {userDetail} from "./LoginForm";

function NewEmployee() {
    const [dni, setDNI] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();
    const {state} = useLocation()

    useEffect(()=>{
        if(state){
            setDNI(state.dni)
            setFirstName(state.firstName)
            setLastName(state.lastName)
        }
    }, [state])
    console.log(dni+" " + firstName + " " + lastName)

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await api.post('/employee/new',
                {
                    dni,
                    firstName,
                    lastName,
                    role
                })
            await api
                .get('/employee/all')
                .then(response => navigate('/employees', {state: response.data}))
                .catch(error => console.log(error))
        } catch (error) {
            console.error(error)
        }
    };


const handleModify = async (event) => {
    event.preventDefault();
    try {
        await api.put('/employee/edit',
            {
                dni,
                firstName,
                lastName,
                role
            })
        await api
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
        <Form style={{paddingLeft: "24px"}} onSubmit={!state ? handleSubmit : handleModify}>
            <Form.Group className="mb-3" controlId="formDNI">
                <Form.Label>DNI</Form.Label>
                <Form.Control required={true} type="text" placeholder="DNI" disabled={state?.dni}
                              defaultValue={state?.dni}
                              onChange={(e) => setDNI(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formFirstName">
                <Form.Label>First Name</Form.Label>
                <Form.Control required={true} type="text" placeholder="First name"
                              defaultValue={state?.firstName}
                              onChange={(e) => {
                                  setFirstName(e.target.value)
                              }}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formLastName">
                <Form.Label>Last Name</Form.Label>
                <Form.Control required={true} type="text" placeholder="Last Name"
                              defaultValue={state?.lastName}
                              onChange={(e) => setLastName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formRole">
                <Form.Label>Role</Form.Label>
                <Form.Select defaultValue={""} required={true}
                             onChange={e => setRole(e.target.value)}
                             aria-label="Default select example">
                    <option value="" disabled hidden>Select role</option>
                    {userDetail.rol === "admin" ? <option value="admin">Admin</option> : null}
                    <option value="hr">Human Resources</option>
                    <option value="shop_vendor">Shop Vendor</option>
                    <option value="shop_manager">Shop Manager</option>
                </Form.Select>
            </Form.Group>
            <Button variant="primary" type="submit">
                {!state ? "Create" : "Modify"}
            </Button>
        </Form>
    </>
)
}

export default NewEmployee;