
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { AvailableScooters, PageVisitsTable } from "../../components/Leaflet";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Scooters In Use</h5>
              <AvailableScooters type={"inuse"} />
            </Col>
            <Col xs={12} xl={6}>
              <h5 className="p-0">Available Scooters</h5>
              <AvailableScooters type={"available"} />
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Low Battery Scooters</h5>
              <AvailableScooters type={"lowbattery"} />
            </Col>
            <Col xs={12} xl={6}>
              <h5 className="p-0">Customers Today</h5>
              <PageVisitsTable />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};
