import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createPricing } from "../../firebaselmp/js/PricingsService";
import { createUserAgreement } from "../../firebaselmp/js/UserAgreementService";
const Container = styled('div')`
    .error {
        border-color: red !important;
    }
`;
export default () => {
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

    const onSave = () => {
        if(title === '' || description === ''){
            setTitleError(title === '');
            setDescriptionError(description === '');
            return;   
        }

        createUserAgreement(title, description)
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

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <Container>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>UserAgreement Add</h5>
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
                            <Form.Control as="textarea" rows="3" value={description}
                            className={descriptionError? "input error" : "input"}
                            onChange={e => {
                                setDescriptionError(false);
                                setDescription(e.target.value);
                            }} />
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <div>
                                <h1>Upload and Display Image usign React Hook's</h1>
                                {selectedImage && (
                                    <div>
                                    <img alt="not fount" width={"250px"} src={URL.createObjectURL(selectedImage)} />
                                    <br />
                                    <button onClick={()=>setSelectedImage(null)}>Remove</button>
                                    </div>
                                )}
                                <br />
                                
                                <br /> 
                                <input
                                    type="file"
                                    name="myImage"
                                    onChange={(event) => {
                                    console.log(event.target.files[0]);
                                    setSelectedImage(event.target.files[0]);
                                    }}
                                />
                            </div>
                        </Form.Group>
                       
                        <Button type="submit" variant="secondary" className="m-2" onClick={onSave}>Add</Button>
                        <Button variant="primary" className="m-2" onClick={navigateTo}>Cancel</Button>                  
                    </Form>
                </Card.Body>
            </Card>
        </Container>
    )
}