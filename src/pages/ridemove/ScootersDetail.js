
import React, { useState, useEffect } from "react";
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form } from '@themesberg/react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from "axios";
import socketIOClient from "socket.io-client";
// const ENDPOINT = "http://127.0.0.1:8080";
const ENDPOINT = "http://54.89.211.240:8080";
const socket = socketIOClient(ENDPOINT);

// const location = useLocation();
// console.log(location.state);
const ScootersDetail = (props) => {
  const {scooterID} = useParams()
  const [scooterStatus, setScooterStatus] = useState({});

  console.log(props.location)
  console.log(scooterID)
  useEffect(() => {
    socket.on("sendMessage", data => {
      var jsonResult = JSON.parse(data.text);
      if(jsonResult.i === scooterID){
        setScooterStatus(jsonResult);
      }
    });
  }, []);
  // const params = props.location.state
  const save = () => {
    var params = new Object;
    params["scooterID"] = document.getElementById("scooterID").value
    params["battery"] = document.getElementById("switchlockbattery").checked
    params["lights"] = document.getElementById("scooter_lights").checked
    params["alarm"] = document.getElementById("scooter_alarm").checked
    params["power"] = document.getElementById("scooter_power").checked
    axios
      .get("http://127.0.0.1:8080/savescooter", {params} )
      .then((res) => {
        console.log(res)
      });
  };

  useEffect(save, []);
  return (
    <>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Scooter Detail</h5>
              <Card border="light" className="shadow-sm p-4">
                <Form>
                  <Form.Group as={Row} className="mb-3" controlId="scooterID">
                    <Form.Label column sm="4">
                      Scooter ID
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue={scooterID} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextMqttPort">
                    <Form.Label column sm="4">
                      MQTT Port
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue="1883" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextLockBattery">
                    <Form.Label column sm="4">
                      Lock Battery
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="switchlockbattery" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextIPAddress">
                    <Form.Label column sm="4">
                      IP Address
                    </Form.Label>
                    <Col sm="8">
                      <Form.Control plaintext readOnly defaultValue="101.37.148.19" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextLockBattery">
                    <Form.Label column sm="4">
                      Scooter Lights
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="scooter_lights"  />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextLockBattery">
                    <Form.Label column sm="4">
                      Turn On Alarm
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="scooter_alarm" />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextLockBattery">
                    <Form.Label column sm="4">
                      Scooter Power
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="scooter_power" />
                    </Col>
                  </Form.Group>
                  <Row>
                    <Col sm="4"><Button variant="primary" type="button" onClick={save}>Save</Button></Col>
                    <Col sm="4"><Button variant="primary" type="button">Cancel</Button></Col>
                    <Col sm="4"><Button variant="primary" type="button">Delete Scooter</Button></Col>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Scooter Query</h5>
              <Card border="light" className="shadow-sm p-4">
                { JSON.stringify(scooterStatus) }
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ScootersDetail