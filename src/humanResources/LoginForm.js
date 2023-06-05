import React, {useState} from 'react';
import axios from 'axios';
import {useNavigate} from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import {Col, Container, Row} from "react-bootstrap";
import Image from 'react-bootstrap/Image';
import logo from '../resources/logo_library.png'

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
                },
                {withCredentials: true})
            console.log(response)
            userDetail = response.data
            navigate('main', {state: response.data});
        } catch (error) {
            console.error(error)
        }
    };

    return (
        <Container fluid>

            <Row style={{
                position: 'absolute', left: '50%', top: '50%',
                transform: 'translate(-50%, -50%)'
            }}>
                <Col>
                    <Form style={{paddingLeft: "24px"}} onSubmit={handleSubmit}>
                        <Image style={{maxWidth: "200px"}} src={logo} rounded/>
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
                            Login
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
};
export var userDetail;

export default LoginForm;