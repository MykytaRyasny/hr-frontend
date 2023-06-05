import React from 'react';
import Button from 'react-bootstrap/Button';
import axios from "axios";
import {useNavigate} from 'react-router-dom';
import {Col, Container, Row} from "react-bootstrap";
import NavBar from "./NavBar";
import {userDetail} from "./LoginForm";
function MainPage() {
    const navigate = useNavigate();
    function onClickList(){
        axios
            .get('/employee/all')
            .then(response => navigate('/employees', {state: response.data}))
            .catch(error => console.log(error))
    }

    return (
        <>
            <NavBar></NavBar>
            <Container fluid>
                <Row style={{padding:20}}>
                    <Col md={{span:1, offset:11}}> <Button variant="outline-primary" onClick={
                        event => navigate('/')
                    }>Logout</Button></Col>
                </Row>
                {(() => { if(userDetail.rol === "admin" || userDetail.rol === "hr") {
                    return <Button variant="outline-primary" onClick={
                    event => onClickList()
                }>Todos los trabajadores</Button>;
                } else {
                    return console.log();
                }})()}
            </Container>
        </>
    );
}

export default MainPage;