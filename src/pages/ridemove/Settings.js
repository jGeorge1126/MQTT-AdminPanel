import React, { useState, useEffect } from 'react';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import styled from "styled-components";
import axios from 'axios';
import { updateUser } from '../../firebaselmp/js/UserService';

const serverURL = "http://54.89.211.240:8080/"
const Container = styled('div')`
    .error {
        border-color: red !important;
    }
`;
export default () => {
    const [id, setId] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');

    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [firstnameError, setFirstnameError] = useState('');
    const [lastnameError, setLastnameError] = useState('');

    const onSave = () => {
        console.log("settings onsave");
        const param = {
            id: id,
            email: email,
            password: password
        }

        // update admin user Email and Password
        axios
        .post(serverURL+'updateEmailAndPassword', param)
        .then((res) =>{
            console.log("res: ", res);
            alert("success");
        })
        .catch(err => {
            console.error(err);
        });

        // update admin user firstname and lastname;
        updateUser(id, firstname, lastname)
        .then(res => {
            
        })
    }

    useEffect(() => {
        const profile = JSON.parse(localStorage.getItem("profile"));
        console.log("profile: ", profile);
        
        setId(profile.id);
        setEmail(profile.email);
        setPassword(profile.password);
        setFirstname(profile.firstname);
        setLastname(profile.lastname);
    }, []);
    
    return (
        <Container>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>Admin Account Settings</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>email</Form.Label>
                            <Form.Control type="text" value={email}
                            className={emailError? "input error" : "input"}
                            onChange={e => {
                                setEmailError(false);
                                setEmail(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>password</Form.Label>
                            <Form.Control type="password" value={password}
                            className={passwordError? "input error" : "input"}
                            onChange={e => {
                                setPasswordError(false);
                                setPassword(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>firstname</Form.Label>
                            <Form.Control type="text" value={firstname}
                            className={firstnameError? "input error" : "input"}
                            onChange={e => {
                                setFirstnameError(false);
                                setFirstname(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>lastname</Form.Label>
                            <Form.Control type="text" value={lastname}
                            className={lastnameError? "input error" : "input"}
                            onChange={e => {
                                setLastnameError(false);
                                setLastname(e.target.value);
                            }} />
                        </Form.Group>
                        <Button type="submit" variant="secondary" className="m-2" onClick={onSave}>save</Button>
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}
