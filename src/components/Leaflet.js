
import React, { useState, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { pageVisits } from "../data/tables";

import { MapContainer, TileLayer } from "react-leaflet";
import RoutineMachine from "./RountineMachine";
var mqtt = require("mqtt");
var options = {
  protocol: "mqtts",
  clientId: 'scooterClient',
  username: 'serverclient',
  password: 'password'
};
var client = mqtt.connect('mqtt://101.37.148.19:1883', options);
client.subscribe('bike');

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
  var note;
  client.on('message', function (topic, message) {
    note = message.toString();
    setMesg(note);
    console.log(note);
    client.end();
  });

  const [mesg, setMesg] = useState(<Fragment><em>nothing heard</em></Fragment>);
  return (
    <Card border="light" className="shadow-sm p-4">
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
  return (
    <Card border="light" className="shadow-sm p-4">
      <MapContainer
        doubleClickZoom={false}
        id="availablescootersmap"
        zoom={14}
        center={[13.6532, 59.3832]}
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