import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getCustomers } from "../../firebaselmp/js/CustomersService";
import { useLocation, route } from 'react-router-dom';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { updatePricing, getPricingById } from "../../firebaselmp/js/PricingsService";
const Container = styled('div')`
    .error {
        border-color: red !important;
    }
`;
export default (props) => {
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

    const id = props.location.id;

    useEffect(() => {
        getPricingById(id)
        .then(data => {
            console.log("data: ", data);
            setPlan(data.plan);
            setUsageTime(data.usageTime);
            setCost(data.cost);
            //alert("success");
        })
        .catch(e => {
            alert("fail");
        })
      }, []);

    const onSave = () => {
        if(plan === '' || usageTime === '' || cost === ''){
            setPlanError(plan === '');
            setUsageTimeError(usageTime === '');
            setCostError(cost === '');
            return;   
        }

        updatePricing(id, plan, usageTime, cost)
        .then(data => {
            alert("succes")
            resetStates();
            history.push('/pricing');
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
                        <h5>Pricing Edit</h5>
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
                            <Form.Control type="text" value={plan}
                            className={planError? "input error" : "input"}
                            onChange={e => {
                                setPlanError(false);
                                setPlan(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>usageTime</Form.Label>
                            <Form.Control type="text" value={usageTime}
                            className={usageTimeError? "input error" : "input"}
                            onChange={e => {
                                setUsageTimeError(false);
                                setUsageTime(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>cost</Form.Label>
                            <Form.Control type="text" value={cost}
                            className={costError? "input error" : "input"}
                            onChange={e => {
                                setCostError(false);
                                setCost(e.target.value);
                            }} />
                        </Form.Group>
                        <Button type="button" variant="secondary" className="m-2" onClick={onSave}>Save</Button>
                        <Button variant="primary" className="m-2" onClick={navigateTo}>Cancel</Button>                  
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}