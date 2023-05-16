import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import axios from "axios";
import {useNavigate} from "react-router-dom";

function NavBar() {
    axios.defaults.baseURL = 'http://127.0.0.1:8080';
    const navigate = useNavigate();
    function onClickList(){
        axios
            .get('/employee/all')
            .then(response => navigate('/employees', {state: response.data}))
            .catch(error => console.log(error))

    }
    function onClickLogout() {
        axios
            .post('/auth/signout')
            .then(response => navigate('/'))
            .catch(error => console.log(error))
    }
    return (
            <Navbar bg="dark" variant="dark">
                <Container>
                    <Navbar.Brand href="#Login">Navbar</Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link  href="/main">Home</Nav.Link>
                        <Nav.Link onClick={
                            event => onClickList()
                        } href="/employees">Employees</Nav.Link>
                        <Nav.Link href="/login">Pricing</Nav.Link>
                        <Nav.Link onClick={event =>onClickLogout()} href="/">Logout</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
    );
}

export default NavBar;