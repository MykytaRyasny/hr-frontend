import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import {useNavigate} from "react-router-dom";
import logo from "../resources/logo_library.png";
import Image from "react-bootstrap/Image";
import React from "react";

function NavBar() {
    axios.defaults.baseURL = 'http://127.0.0.1:8080';
    const navigate = useNavigate();

    function onClickList(){
        debugger
        axios
            .get('/employee/all', {withCredentials: true})
            .then(response => navigate('/employees', {state: response.data}))
            .catch(error => console.log(error))
    }
    function onClickNewEmployee(){
        navigate('/newemployee')
    }
    function onClickLogout() {
        axios
            .post('/auth/signout')
            .then(response => document.cookie = "library=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;")
            .then(response => navigate('/'))
            .catch(error => console.log(error))
    }
    function onClickHome(){
        navigate('/main')
    }
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Image style={{maxWidth:"50px"}} src={logo} rounded />
                    <Navbar.Brand href="/main" onClick={() => onClickHome()}>Library</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={event => onClickList()
                        } href="/employees">Employees</Nav.Link>
                        <Nav.Link onClick={event => onClickNewEmployee()} href="/newemployee">New Employee</Nav.Link>
                        <Nav.Link onClick={event =>onClickLogout()} href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default NavBar;