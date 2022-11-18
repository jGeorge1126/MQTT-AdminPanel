import React from 'react';
import { Col, Row, Button, Dropdown, ButtonGroup } from '@themesberg/react-bootstrap';
import { AvailableScooters } from "../../components/Leaflet";

export default () => {
    return (
        <>
        <h2>Scooters Page</h2>
        <Row>
            <Col xs={12} xl={12} className="mb-4">
                <AvailableScooters type="allscooters" />
            </Col>
        </Row>
      </>
    )
}