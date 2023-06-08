import React from 'react';
import NavBar from "./NavBar";
import Card from 'react-bootstrap/Card';
import {userDetail} from './LoginForm'
import Container from "react-bootstrap/Container";
import {Col, Row} from "react-bootstrap";

function MainPage() {

    return (
        <>
            <NavBar></NavBar>
            <Container fluid>

                <Row style={{
                    position: 'absolute', left: '50%', top: '50%',
                    transform: 'translate(-50%, -50%)'
                }}>
                    <Col>
                        <Card style={{width: '18rem'}}>
                            <Card.Body>
                                <Card.Title>Welcome {userDetail.firstName} {userDetail.lastName}</Card.Title>
                                <Card.Subtitle className="mb-2 text-muted">{userDetail.username}</Card.Subtitle>
                                <Card.Text>
                                    Welcome to library! Have a nice working day!
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </>
    );
}

export default MainPage;