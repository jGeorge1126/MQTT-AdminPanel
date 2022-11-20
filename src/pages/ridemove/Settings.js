import React, { useState, useEffect } from 'react';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import styled from "styled-components";
import axios from 'axios';
import { updateUser } from '../../firebaselmp/js/UserService';

// const serverURL = "http://127.0.0.1:8080/"
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
    const [detailComponent, setDetailComponent] = useState();

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
    function handleCommands(event){
        var value = event.target.value
        console.log(value)
        var tempComponent
        if(value === "23") {
          tempComponent = (<Form.Group as={Row} className="mb-3" controlId="packageNumber">
            <Form.Label column sm="4">
              Package Number
            </Form.Label>
            <Col sm="8">
              <Form.Control type="number" />
              <Form.Text id="packageNumberHelp" muted>
                Package number of updating file, 1024 bytes each package
              </Form.Text>
            </Col>
          </Form.Group>);
        } else if(value === "67") {
          tempComponent = (
            <>
              <Form.Group as={Row} className="mb-3" controlId="serialNumber">
                <Form.Label column sm="4">
                  Serial Number
                </Form.Label>
                <Col sm="8">
                  <Form.Control type="number" />
                  <Form.Text id="serialNumberHelp" muted>
                    Firmware package serial number
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="dataLength">
                <Form.Label column sm="4">
                  Data Length
                </Form.Label>
                <Col sm="8">
                  <Form.Control type="number" />
                  <Form.Text id="dataLengthHelp" muted>
                    Data Length
                  </Form.Text>
                </Col>
              </Form.Group>
              <Form.Group as={Row} className="mb-3" controlId="firmwareData">
                <Form.Label column sm="4">
                  Firmware Data
                </Form.Label>
                <Col sm="8">
                  <Form.Control type="text" />
                  <Form.Text id="firmwareDataHelp" muted>
                    binary type ("012z")
                  </Form.Text>
                </Col>
              </Form.Group>
            </>
          );
        } else if(value === "53") {
          tempComponent = (
          <>
          <Form.Group as={Row} className="mb-3" controlId="apn">
            <Form.Label column sm="4">
              APN setting
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="apnusername">
            <Form.Label column sm="4">
              Username
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="apnpassword">
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
            </Col>
          </Form.Group>
          </>);
        } else if(value === "101") {
          tempComponent = (
          <>
          <Form.Group as={Row} className="mb-3" controlId="serverIP">
            <Form.Label column sm="4">
              IP
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
              <Form.Text id="serverIPHelp" muted>
                0:0:0:0
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="serverPort">
            <Form.Label column sm="4">
              Port
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
              <Form.Text id="serverPortHelp" muted>
                1883
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="serverUserName">
            <Form.Label column sm="4">
              Username
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
              <Form.Text id="serverUserNameHelp" muted>
                "username"
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="serverPassword">
            <Form.Label column sm="4">
              Password
            </Form.Label>
            <Col sm="8">
              <Form.Control type="text" />
              <Form.Text id="serverPasswordHelp" muted>
                "password"
              </Form.Text>
            </Col>
          </Form.Group>
          </>
          );
        }
        setDetailComponent(tempComponent) 
      }
      function handleSentCommands(){
        var params = new Object;
        params.scooterID = document.getElementById("scooterID").value
        params.payload = "{'a':"+document.getElementById("commandlist").value
        var value = document.getElementById("commandlist").value
        if(value === "23"){
          params.payload += ",'l':"+document.getElementById("packageNumber").value
        }else if(value === "67"){
          params.payload += ",'x':"+document.getElementById("serialNumber").value+",'l':"+document.getElementById("dataLength").value+",'d':"+document.getElementById("firmwareData").value
        }else if(value === "53"){
          params.payload += ",'z':AT+QICSGP=15,1,'"+document.getElementById("apn").value+"','"+document.getElementById("apnusername").value+"','"+document.getElementById("apnpassword").value+"',0"
        }else if(value === "101"){
          params.payload += ",'u':"+document.getElementById("serverIP").value+":"+document.getElementById("serverPort")+":"+document.getElementById("serverUserName")+":"+document.getElementById("serverPassword")+":"
        }
        params.payload += "}"
        axios
          .get(serverURL+"scootersetting", {params} )
          .then((res) => {
            console.log(res)
            if(res.data === "Success"){
              alert("Success");
            }
          });
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
            <Row>
                <Col xs={12} xl={6} className="mb-4">
                    <Card border="light" className="shadow-sm mb-4" xs={12} xl={6} sm={6}>
                        <Card.Header>
                            <Row className="align-items-center">
                            <Col>
                                <h5>Admin Account Settings</h5>
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
                </Col>
                <Col xs={12} xl={6} className="mb-4">
                    <Card border="light" className="shadow-sm mb-4" xs={12} xl={6} sm={6}>
                        <Card.Header>
                            <Row className="align-items-center">
                            <Col>
                                <h5>Admin Account Settings</h5>
                            </Col>
                            </Row>
                        </Card.Header>
                        <Card.Body>
                            <Form>
                                <Form.Group as={Row} className="mb-3" controlId="formPlaintextCommandsList">
                                    <Form.Label column sm="4">
                                    Commands List
                                    </Form.Label>
                                    <Col sm="8">
                                    <Form.Select aria-label="Default select example" id="commandlist" onChange={handleCommands}>
                                        <option>Open this select menu</option>
                                        <option value="20">Reboot IOT</option>
                                        <option value="93">Reboot IOT if Updated</option>
                                        <option value="21">Qurey hardware and firmware version</option>
                                        <option value="23">Start Upgrade firmware</option>
                                        <option value="67">Send updating data</option>
                                        <option value="24">Query IEMI number</option>
                                        <option value="26">Enter transport mode / Doesn't exist</option>
                                        <option value="35">Query server parameters</option>
                                        <option value="47">Get QCELLLOC / Doesn't exist</option>
                                        <option value="53">APN setting</option>
                                        <option value="77">Query IOT Log</option>
                                        <option value="97">Query 4G signal intensity</option>
                                        <option value="101">Set Iot Parameters</option>
                                        <option value="103">Modify IOT SN / Doesn't exist</option>
                                    </Form.Select>
                                    </Col>
                                </Form.Group>
                                { detailComponent }
                            </Form>
                            <Row>
                                <Col sm="12"><Button variant="primary" type="button" onClick={handleSentCommands}>Send Command</Button></Col>
                            </Row>
                        </Card.Body>
                    </Card>
                </Col>
            </Row>
        </Container>
    )
}
