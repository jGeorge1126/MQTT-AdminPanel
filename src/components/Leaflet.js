
import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { pageVisits } from "../data/tables";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import socketIOClient from "socket.io-client";
import RoutineMachine from "./RountineMachine";
import icon from "../marker-icon.png";

// const ENDPOINT = "http://127.0.0.1:8000";
const ENDPOINT = "http://54.89.211.240:8000";
const socket = socketIOClient(ENDPOINT);

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const ScootersInUse = () => {
  return (
    <Card border="light" className="shadow-sm p-4">
      <h5></h5>
      <MapContainer
        doubleClickZoom={false}
        id="scooterinusemap"
        zoom={14}
        center={[43.6532, 79.3832]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <RoutineMachine /> */}
      </MapContainer>
    </Card>
  );
};

export const AvailableScooters = () => {
  const [scootermarkers, setScootermarker] = useState([]);
  
  useEffect(() => {
    socket.on("sendMessage", data => {
      console.log(data);
      var jsonResult = JSON.parse(data.text);
      
      let updatedvalue = {
        i: jsonResult.i,
      };
      const prevScooterIndex = scootermarkers.findIndex(s => s.i === jsonResult.i)
      if (prevScooterIndex !== -1) {
        updatedvalue = {
          ...scootermarkers[prevScooterIndex],
        }
      }

      if(jsonResult.a == 19){
        var temp = jsonResult.g.split(",");
        
        updatedvalue.lat = temp[0]
        updatedvalue.lng = temp[1]
      } else if(jsonResult.a == 27){
        updatedvalue.b = jsonResult.b
      }
      
      setScootermarker(p => {
        let prevScooters = [...p]
        const prevScooterIndex = p.findIndex(s => s.i === updatedvalue.i)
        if (prevScooterIndex === -1) {
          prevScooters.push(updatedvalue)
        } else {
          prevScooters[prevScooterIndex] = {
            ...prevScooters[prevScooterIndex],
            ...updatedvalue
          }
        }
        console.log(prevScooters, "prevScooters")
        return [...prevScooters]
      })
      // if(jsonResult["i"] == "TEST-999666" && jsonResult["a"] == 19){
      //   var temp = jsonResult["g"].split(",");
      //   setResponselat(temp[0]);
      //   setResponselng(temp[1]);
      // }
      // if(jsonResult["i"] == "TEST-999666" && jsonResult["a"] == 27){
      //   setResponsebat(jsonResult["b"]);
      // }
    });
  }, []);
  console.log(scootermarkers);
  return (
    <Card border="light" className="shadow-sm p-4">
      <MapContainer
        doubleClickZoom={false}
        id="availablescootersmap"
        zoom={14}
        center={[47.90722,13.76072]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        { (scootermarkers || []).filter(s => s.lat && s.lng).map(s => 
          <Marker position={[s.lat, s.lng]}>
            <Popup>
              { s.battery >= 0 ? s.b : '' }%
            </Popup>
          </Marker>
        )}
        {/* <RoutineMachine /> */}
      </MapContainer>
    </Card>
  );
};

export const LowBatteryScooters = () => {
  return (
    <Card border="light" className="shadow-sm p-4">
      <MapContainer
        doubleClickZoom={false}
        id="lowbatteryscootersmap"
        zoom={14}
        center={[73.6532, 79.3832]}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {/* <RoutineMachine /> */}
      </MapContainer>
    </Card>
  );
};