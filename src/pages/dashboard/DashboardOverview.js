
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { ScootersInUse, AvailableScooters, LowBatteryScooters, PageVisitsTable } from "../../components/Leaflet";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <Row>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Scooters In Use</h5>
              <ScootersInUse />
            </Col>
            <Col xs={12} xl={6}>
              <h5 className="p-0">Available Scooters</h5>
              <AvailableScooters />
            </Col>
          </Row>
          <Row>
            <Col xs={12} xl={6} className="mb-4">
              <h5 className="p-0">Low Battery Scooters</h5>
              <LowBatteryScooters />
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
