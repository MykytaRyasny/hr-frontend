import React, {useState} from 'react';
import axios from 'axios';
import {Navigate, useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import 'bootstrap/dist/css/bootstrap.css';
import {Col} from "react-bootstrap";
import MainPage from "./MainPage";
import App from "../App";
const LoginForm = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (event) => {
        event.preventDefault();
        axios.defaults.baseURL = 'http://127.0.0.1:8080';
        try {
            const response = await axios.post('/auth/login',
            {
                username,
                password
            })
            navigate('main', {state: response.data});
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Form onSubmit={handleSubmit} >
            <Form.Group as={Col} className="mb-3" controlId="formBasicEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="Enter email"
                              value={username} onChange={(e) => setUsername(e.target.value)}/>
                <Form.Text className="text-muted">
                    We'll never share your email with anyone else.
                </Form.Text>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password"
                              value={password} onChange={(e) => setPassword(e.target.value)}/>
            </Form.Group>
            <Button variant="primary" type="submit">
                Submit
            </Button>
        </Form>
    );
};

export default LoginForm;