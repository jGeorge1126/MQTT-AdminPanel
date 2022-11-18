
import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCashRegister, faChartLine, faCloudUploadAlt, faPlus, faRocket, faTasks, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { AvailableScooters } from "../../components/Leaflet";

export default () => {
  return (
    <>
      <Row>
        <Col xs={12} xl={12} className="mb-4">
          <AvailableScooters type="dashboard" />
        </Col>
      </Row>
    </>
  );
};
