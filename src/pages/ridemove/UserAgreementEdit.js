import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getCustomers } from "../../firebaselmp/js/CustomersService";
import { useLocation, route } from 'react-router-dom';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { updatePricing, getPricingById } from "../../firebaselmp/js/PricingsService";
import { getUserAgreementById, updateUserAgreement } from "../../firebaselmp/js/UserAgreementService";
const Container = styled('div')`
    .error {
        border-color: red !important;
    }
`;
export default (props) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [createSuccess, setCreateSuccess] = useState(false);
    const [createError, setCreateError] =  useState(false);

    const [titleError, setTitleError] = useState(false);
    const [descriptionError, setDescriptionError] = useState(false);

    const history = useHistory();
    const navigateTo = () => history.push('/user-agreement');

    const resetStates = ()=>{
        setTitle('');
        setDescription('');

        setTitleError(false);
        setDescriptionError(false);
    }

    const id = props.location.id;

    useEffect(() => {
        getUserAgreementById(id)
        .then(data => {
            console.log("data: ", data);
            setTitle(data.title);
            setDescription(data.description);
        })
        .catch(e => {
            alert("fail");
        })
      }, []);

    const onSave = () => {
        if(title === '' || description === ''){
            setTitleError(title === '');
            setDescriptionError(description === '');
            return;   
        }

        updateUserAgreement(id, title, description)
        .then(data => {
            alert("succes")
            resetStates();
            history.push('/user-agreement');
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
                        <h5>User Agreement Edit</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    <Form>
                        <Form.Group className="mb-3">
                            <Form.Label>title</Form.Label>
                            <Form.Control type="text" value={title}
                            className={titleError? "input error" : "input"}
                            onChange={e => {
                                setTitleError(false);
                                setTitle(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>description</Form.Label>
                            <Form.Control as="textarea" rows={3} value={description}
                            className={descriptionError? "input error" : "input"}
                            onChange={e => {
                                setDescriptionError(false);
                                setDescription(e.target.value);
                            }} />
                        </Form.Group>
                        <Button type="submit" variant="secondary" className="m-2" onClick={onSave}>Save</Button>
                        <Button variant="primary" className="m-2" onClick={navigateTo}>Cancel</Button>                  
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}