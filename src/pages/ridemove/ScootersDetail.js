
import React, { useState, useEffect } from "react";
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup, Form } from '@themesberg/react-bootstrap';
import { useParams } from 'react-router-dom';
import axios from "axios";
import { AvailableScooters } from "../../components/Leaflet";
// const location = useLocation();
// console.log(location.state);
const serverURL = "http://127.0.0.1:8080/"
// const serverURL = "http://54.89.211.240:8080"
const ScootersDetail = (props) => {
  const {scooterID} = useParams()
  const [scooterStatus, setScooterStatus] = useState({});
  const [detailComponent, setDetailComponent] = useState();
  // const params = props.location.state
  function handleBattery(event) {
    var params = new Object;
    var status = event.target.checked;
    params["scooterID"] = document.getElementById("scooterID").value
    params["battery"] = status
    axios
      .get(serverURL+"changebatterystatus", {params} )
      .then((res) => {
        console.log(res)
        if(res.data === "Success"){
          if(status === true){
            alert("Battery Locked")
          }else {
            alert("Battery Unlocked");
          }
        }
      });
  };
  function handleLights(event) {
    var params = new Object;
    var status = event.target.checked;
    params["scooterID"] = document.getElementById("scooterID").value
    params["lights"] = status
    axios
      .get(serverURL+"changelightstatus", {params} )
      .then((res) => {
        console.log(res)
        if(res.data === "Success"){
          if(status === true){
            alert("Light Turned On")
          }else {
            alert("Light Turned Off");
          }
        }
      });
  };
  function handleAlarm(event) {
    var params = new Object;
    var status = event.target.checked;
    params["scooterID"] = document.getElementById("scooterID").value
    params["alarm"] = status
    if(status){
      axios
      .get(serverURL+"changealarmstatus", {params} )
      .then((res) => {
        console.log(res)
        if(res.data === "Success"){
          alert("Alarm Buzzer")
        }
      });
    }
  };
  function handlePower(event) {
    var params = new Object;
    var status = event.target.checked;
    params["scooterID"] = document.getElementById("scooterID").value
    params["power"] = status
    axios
      .get(serverURL+"changepowerstatus", {params} )
      .then((res) => {
        console.log(res)
        if(res.data === "Success"){
          if(status === true){
            alert("Power On")
          }else {
            alert("Power Off");
          }
        }
      });
  };
  function handleCommands(event){
    var value = event.target.value
    console.log(value)
    var tempComponent
    if(value === "13") {
      // setCommandState(13);
      tempComponent = (<Form.Group as={Row} className="mb-3" controlId="speedInput">
        <Form.Label column sm="4">
          Speed
        </Form.Label>
        <Col sm="8">
          <Form.Control type="number" max={30} min={0} />
        </Col>
      </Form.Group>);
    } else if(value === "23") {
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
    } else if(value === "58") {
      tempComponent = (
        <>
          <Form.Group as={Row} className="mb-3" controlId="numberRings">
            <Form.Label column sm="4">
              Number of Rings
            </Form.Label>
            <Col sm="8">
              <Form.Control type="number" />
              <Form.Text id="numberRingsHelp" muted>
                Number of Rings
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="timebuzzerRing">
            <Form.Label column sm="4">
              Time of buzzer ring
            </Form.Label>
            <Col sm="8">
              <Form.Control type="number" />
              <Form.Text id="timebuzzerRingHelp" muted>
                Unit:ms
              </Form.Text>
            </Col>
          </Form.Group>
          <Form.Group as={Row} className="mb-3" controlId="timenotSound">
            <Form.Label column sm="4">
              The time of that the buzzer does not sound
            </Form.Label>
            <Col sm="8">
              <Form.Control type="number" />
              <Form.Text id="timenotSoundHelp" muted>
                Unit:ms
              </Form.Text>
            </Col>
          </Form.Group>
        </>
      );
    } else if(value === "39") {
      tempComponent = (<Form.Group as={Row} className="mb-3" controlId="vibrationSetting">
        <Form.Label column sm="4">
          Vibration Setting
        </Form.Label>
        <Col sm="8">
          <Form.Control type="number" />
          <Form.Text id="vibrationSettingHelp" muted>
            0: turn off vibration  0: vibration sensitivity
          </Form.Text>
        </Col>
      </Form.Group>);
    } else if(value === "41") {
      tempComponent = (<Form.Group as={Row} className="mb-3" controlId="speedUnitLabel">
        <Form.Label column sm="4">
          Kilometer or mile switch setting
        </Form.Label>
        <Col sm="8">
          <Form.Select aria-label="Default select example" id="speedUnit">
            <option value='none'>none</option>
            <option value="0">kilometer</option>
            <option value="1">mile</option>
          </Form.Select>
          <Form.Text id="speedUnitHelp" muted>
            0: kilometer 1: mile
          </Form.Text>
        </Col>
      </Form.Group>);
    } else if(value === "43") {
      tempComponent = (<Form.Group as={Row} className="mb-3" controlId="lampmodeLabel">
        <Form.Label column sm="4">
          Lamp mode setting
        </Form.Label>
        <Col sm="8">
          <Form.Select aria-label="Default select example" id="lampMode">
            <option value="none">none</option>
            <option value="0">Command Control</option>
            <option value="1">Always On</option>
          </Form.Select>
          <Form.Text id="lampModeHelp" muted>
            0: Command Control 1: Always On
          </Form.Text>
        </Col>
      </Form.Group>);
    } else if(value === "53") {
      tempComponent = (<Form.Group as={Row} className="mb-3" controlId="apnSetting">
        <Form.Label column sm="4">
          APN setting
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" />
          <Form.Text id="apnSettingHelp" muted>
            AT+QICSGP=15,1,'apn','username','password',0
            Example: If you want to set the APN as 123, username as 456, password as 789, send "a":53, "z":AT+QICSGP=15,1,"123","456","789",0
            If there is no username and password, the relevant position is empty. Such as APN is 123, username is empty, password is empty, send "a":53, "z":AT+QICSGP=15,1,"123","","",0
          </Form.Text>
        </Col>
      </Form.Group>);
    } else if(value === "101") {
      tempComponent = (<Form.Group as={Row} className="mb-3" controlId="serverParam">
        <Form.Label column sm="4">
          Set server parameters
        </Form.Label>
        <Col sm="8">
          <Form.Control type="text" />
          <Form.Text id="serverParamHelp" muted>
            18.180.156.177: 1883:username :password:
          </Form.Text>
        </Col>
      </Form.Group>);
    }
    setDetailComponent(tempComponent) 
  }
  function handleSentCommands(){
    var params = new Object;
    params.scooterID = document.getElementById("scooterID").value
    params.payload = "{'a':"+document.getElementById("commandlist").value
    var value = document.getElementById("commandlist").value
    if(value === "13"){
      params.payload += ",'k':20"+document.getElementById("speedInput").value
    }else if(value === "23"){
      params.payload += ",'l':"+document.getElementById("packageNumber").value
    }else if(value === "67"){
      params.payload += ",'x':"+document.getElementById("serialNumber").value+",'l':"+document.getElementById("dataLength").value+",'d':"+document.getElementById("firmwareData").value
    }else if(value === "58"){
      params.payload += ",'v':"+document.getElementById("numberRings").value+",'i':"+document.getElementById("timebuzzerRing").value+",'L':"+document.getElementById("timenotSound").value
    }else if(value === "39"){
      params.payload += ",'v':"+document.getElementById("vibrationSetting").value
    }else if(value === "41"){
      if(document.getElementById("speedUnit").value !== 'none'){
        params.payload += ",'f':"+document.getElementById("speedUnit").value
      }
    }else if(value === "43"){
      if(document.getElementById("lampmodeLabel").value !== 'none'){
        params.payload += ",'j':"+document.getElementById("lampmodeLabel").value
      }
    }else if(value === "53"){
      params.payload += ",'z':"+document.getElementById("apnSetting").value
    }else if(value === "101"){
      params.payload += ",'u':"+document.getElementById("serverParam").value
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
                      <Form.Check type="switch" id="switchlockbattery" onChange={handleBattery}/>
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
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextScooterLights">
                    <Form.Label column sm="4">
                      Scooter Lights
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="scooter_lights" onChange={handleLights} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextAlarm">
                    <Form.Label column sm="4">
                      Turn On Alarm
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="scooter_alarm" onChange={handleAlarm} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextScooterPower">
                    <Form.Label column sm="4">
                      Scooter Power
                    </Form.Label>
                    <Col sm="8">
                      <Form.Check type="switch" id="scooter_power" onChange={handlePower} />
                    </Col>
                  </Form.Group>
                  <Form.Group as={Row} className="mb-3" controlId="formPlaintextCommandsList">
                    <Form.Label column sm="4">
                      Commands List
                    </Form.Label>
                    <Col sm="8">
                      <Form.Select aria-label="Default select example" id="commandlist" onChange={handleCommands}>
                        <option>Open this select menu</option>
                        <option value="5">Clear single riding mileage</option>
                        <option value="7">Clear single riding time</option>
                        <option value="9">Clear total mileage</option>
                        <option value="11">Clear the total riding time</option>
                        <option value="13">Set the speed limit data</option>
                        <option value="15">Query vehicle parameters</option>
                        <option value="18">Query GPS location data</option>
                        <option value="20">Reboot IOT</option>
                        <option value="93">Reboot IOT if Updated</option>
                        <option value="21">Qurey hardware and firmware version</option>
                        <option value="23">Start Upgrade firmware</option>
                        <option value="67">Send updating data</option>
                        <option value="24">Query IEMI number</option>
                        <option value="26">Enter transport mode</option>
                        <option value="58">Special alarm buzzer</option>
                        <option value="35">Query server parameters</option>
                        <option value="39">Vibration sensitivity setting</option>
                        <option value="41">Kilometer or mile switch setting</option>
                        <option value="43">Lamp mode setting</option>
                        <option value="45">Set protection of motor controller’s temperature</option>
                        <option value="47">Get QCELLLOC</option>
                        <option value="53">APN setting</option>
                        <option value="71">Chainlock unlock</option>
                        <option value="73">Enter to pause mode</option>
                        <option value="75">Exit pause mode</option>
                        <option value="77">Query IOT Log</option>
                        <option value="79">Open the station lock</option>
                        <option value="81">Close the station lock</option>
                        <option value="83">Query status of chain lock</option>
                        <option value="97">Query 4G signal intensity</option>
                        <option value="101">Set Iot Parameters</option>
                        <option value="103">Modify IOT SN</option>
                      </Form.Select>
                    </Col>
                  </Form.Group>
                  { detailComponent }
                  <Row>
                    <Col sm="4"><Button variant="primary" type="button" onClick={handleSentCommands}>Send Command</Button></Col>
                    <Col sm="4"><Button variant="primary" type="button">Delete Scooter</Button></Col>
                  </Row>
                </Form>
              </Card>
            </Col>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Scooter Query</h5>
              <AvailableScooters type="scooterdetail" scooterID={scooterID} />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default ScootersDetail