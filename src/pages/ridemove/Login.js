
import React, {useState} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAngleLeft, faEnvelope, faUnlockAlt } from "@fortawesome/free-solid-svg-icons";
import { faFacebookF, faGithub, faTwitter } from "@fortawesome/free-brands-svg-icons";
import { Col, Row, Form, Card, Button, FormCheck, Container, InputGroup } from '@themesberg/react-bootstrap';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { Routes } from "../../routes";
import BgImage from "../../assets/img/illustrations/signin.svg";
import { logInWithEmailAndPassword } from "../../firebaselmp/js/UserService";

const Contain= styled('div')`
    .error {
        border-color: red !important;
    }
    .error-msg {
        margin-top: 16px;
        color: red;
        font-size: 14px;
        line-height: 100%;
        padding: 0px 6px;
        visibility: hidden;
        height: 18px;
        margin-bottom: 20px;
        word-wrap: break-word;
    }
    .error-msg.active {
        visibility: visible;
    }
`;
export default () => {
    const [error, setError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');

    const history = useHistory();

    const onLogin = () => {
        if(email === '' || password === '' ){
            setEmailError(email === '');
            setPasswordError(password === '');
            return;   
        }

        logInWithEmailAndPassword(email, password).then((data) => {
            console.log("data: ", data);
            if (data.error !== "") {
                setError(data.error);
                return;
            } else {
                localStorage.setItem("profile", JSON.stringify({...data.profile, email: email, password: password}));
                localStorage.setItem("isAuthenticated", true);
                console.log("localStorage: ", localStorage.getItem("profile"));
                history.push("/dashboard/overview");
            }
        });
    }

    return (
        <Contain>
            <main>
                <section className="d-flex align-items-center my-5 mt-lg-6 mb-lg-5">
                    <Container>
                    
                    <Row className="justify-content-center form-bg-image" >
                        <Col xs={12} className="d-flex align-items-center justify-content-center">
                        <div className="bg-white shadow-soft border rounded border-light p-4 p-lg-5 w-100 fmxw-500">
                            <div className="text-center text-md-center mb-4 mt-md-0">
                            <h3 className="mb-0">LiteRide</h3>
                            </div>
                            <Form className="mt-4">
                            <Form.Group id="email" className="mb-4">
                                <Form.Label>Your Email</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className={emailError? "input error" : "input"}>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                    </InputGroup.Text>
                                    <Form.Control autoFocus type="email" placeholder="example@company.com"
                                    className={emailError? "input error" : "input"}
                                    onChange={e => {
                                        setEmailError(false);
                                        setEmail(e.target.value);
                                    }}
                                    />
                                </InputGroup>
                            </Form.Group>
                            <Form.Group>
                                <Form.Group id="password" className="mb-4">
                                <Form.Label>Your Password</Form.Label>
                                <InputGroup>
                                    <InputGroup.Text className={passwordError? "input error" : "input"}>
                                    <FontAwesomeIcon icon={faUnlockAlt} />
                                    </InputGroup.Text>
                                    <Form.Control type="password" placeholder="Password" 
                                    className={passwordError? "input error" : "input"}
                                    onChange={e => {
                                        setPasswordError(false);
                                        setPassword(e.target.value);
                                    }}
                                    />
                                </InputGroup>
                                </Form.Group>
                                <div className={error ? "error-msg active" : "error-msg"}>
                                    {error}
                                </div>
                                {/* <div className="d-flex justify-content-between align-items-center mb-4">
                                <Form.Check type="checkbox">
                                    <FormCheck.Input id="defaultCheck5" className="me-2" />
                                    <FormCheck.Label htmlFor="defaultCheck5" className="mb-0">Remember me</FormCheck.Label>
                                </Form.Check>
                                <Card.Link className="small text-end">Lost password?</Card.Link>
                                </div> */}
                            </Form.Group>
                            <div style={{textAlign:"center"}}>
                                <Button variant="primary" type="button" onClick={onLogin}>
                                    Enter
                                </Button>
                            </div>
                            </Form>
                        </div>
                        </Col>
                    </Row>
                    </Container>
                </section>
            </main>
        </Contain>
    );
};
