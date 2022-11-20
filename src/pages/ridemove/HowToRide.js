import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Form, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import styled from "styled-components";
import { useHistory } from "react-router-dom";
import { createPricing } from "../../firebaselmp/js/PricingsService";
import { createUserAgreement } from "../../firebaselmp/js/UserAgreementService";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { FieldPath } from "@firebase/firestore";

const Container = styled('div')`
    .error {
        border-color: red !important;
    }
`;
export default () => {
    // State to store uploaded file
    const [file, setFile] = useState("");
 
    // progress
    const [percent, setPercent] = useState(0);
 
    // Handle file upload event and update state
    function handleChange(event) {
        setFile(event.target.files[0]);
    }
 
    const handleUpload = () => {
        if (!file) {
            alert("Please upload an image first!");
        }
        console.log("file: ", file);
        
        const storage = getStorage();
        const storageRef = ref(storage, `/files/${file.name}`);
 
        // progress can be paused and resumed. It also exposes progress updates.
        // Receives the storage reference and the file to upload.
        const uploadTask = uploadBytesResumable(storageRef, file);
 
        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const percent = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
 
                // update progress
                setPercent(percent);
            },
            (err) => console.log(err),
            () => {
                // download url
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    console.log(url);
                });
            }
        );
    };

    const [selectedImage, setSelectedImage] = useState(null);

    return (
        <Container>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>How To Ride</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                </Card.Header>
                <Card.Body>
                    {file && (
                        <div>
                            <video width="750" height="500" controls >
                                <source src={URL.createObjectURL(file)} type="video/mp4"/>
                            </video>
                            <br />
                            <button onClick={()=>setFile(null)}>Remove</button>
                        </div>
                    )}
                    <div>
                        
                        <input type="file" onChange={handleChange} accept="/image/*" />
                        <button onClick={handleUpload}>Upload to Firebase</button>
                        <p>{percent} "% done"</p>
                    </div>
                </Card.Body>
            </Card>
        </Container>
    )
}
