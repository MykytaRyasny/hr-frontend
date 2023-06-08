import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import api from "./AxiosConfig";
import {useNavigate} from "react-router-dom";
import logo from "../resources/logo_library.png";
import Image from "react-bootstrap/Image";
import React, {useEffect, useState} from "react";
import {userDetail} from "./LoginForm";

function NavBar() {
    const navigate = useNavigate();
    const [userData, setUserData] = useState({})

    useEffect(()=>{
        if(userDetail){
            setUserData(userDetail)
        }
    },[])
    function onClickList(){
        api
            .get('/employee/all')
            .then(response => navigate('/employees', {state: response.data}))
            .catch(error => console.log(error))
    }
    function onClickNewEmployee(){
        navigate('/newemployee')
    }
    function onClickLogout() {
        api
            .post('/auth/signout')
            .then(api.defaults.headers.common["x-auth-token"] = "")
            .then(response => navigate('/'))
            .catch(error => console.log(error))
    }
    function onClickHome(){
        navigate('/main')
    }
    return (
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Image style={{maxWidth:"50px"}} src={logo} rounded />
                    <Navbar.Brand href="/main" onClick={() => onClickHome()}>Library</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link onClick={event => onClickList()
                        } href="/employees">Employees</Nav.Link>
                        {(userData && userData.rol === "admin") || (userData && userData.rol === "hr") ? (
                            <Nav.Link onClick={event => onClickNewEmployee()} href="/newemployee">New Employee</Nav.Link>
                            ) : null
                        }
                    </Nav>
                    <Nav>
                        <Nav.Link onClick={event =>onClickLogout()} href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default NavBar;