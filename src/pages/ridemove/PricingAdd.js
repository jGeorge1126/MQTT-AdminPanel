import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getCustomers } from "../../firebaselmp/js/CustomersService";
import { useLocation } from 'react-router-dom';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createPricing } from "../../firebaselmp/js/PricingsService";
const Container = styled('div')`
    .error {
        border-color: red !important;
    }
`;
export default () => {
    const [plan, setPlan] = useState('');
    const [usageTime, setUsageTime] = useState('');
    const [cost, setCost] = useState('');
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] =  useState(false);

    const [planError, setPlanError] = useState(false);
    const [usageTimeError, setUsageTimeError] = useState(false);
    const [costError, setCostError] = useState(false);

    const history = useHistory();

    const navigateTo = () => history.push('/pricing');

    const resetStates = ()=>{
        setPlan('');
        setUsageTime('');
        setCost('');

        setPlanError(false);
        setUsageTimeError(false);
        setCostError(false);
    }

    const onSave = () => {
        console.log("data: ", plan, usageTime, cost);
        if(plan === '' || usageTime === '' || cost === ''){
            setPlanError(plan === '');
            setUsageTimeError(usageTime === '');
            setCostError(cost === '');
            return;   
        }

        createPricing(plan, usageTime, cost)
        .then(data => {
            if(data.id !== '')
            {
                alert("succes")
                resetStates();
            }
        })
        .catch(e =>{
            alert("fail");
        });
    }

    return (
        <Container>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>Pricing Add</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>plan</Form.Label>
                            <Form.Control type="text" placeholder="Plan1" value={plan}
                            className={planError? "input error" : "input"}
                            onChange={e => {
                                setPlanError(false);
                                setPlan(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>usageTime</Form.Label>
                            <Form.Control type="text" placeholder="30min" value={usageTime}
                            className={planError? "input error" : "input"}
                            onChange={e => {
                                setUsageTimeError(false);
                                setUsageTime(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>cost</Form.Label>
                            <Form.Control type="text" placeholder="$0.23 USD/min" value={cost}
                            className={planError? "input error" : "input"}
                            onChange={e => {
                                setCostError(false);
                                setCost(e.target.value);
                            }} />
                        </Form.Group>
                        <Button type="submit" variant="secondary" className="m-2" onClick={onSave}>Add</Button>
                        <Button variant="primary" className="m-2" onClick={navigateTo}>Cancel</Button>                  
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}