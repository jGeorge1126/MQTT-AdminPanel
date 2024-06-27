import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Button, Table, Modal, Image, Form, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getCustomerById, getCustomers, updateIDVerification } from "../../firebaselmp/js/CustomersService";
import { useLocation } from 'react-router-dom';

export default () => {
    const [customers, setCustomers] = useState([]);
    const [showDefault, setShowDefault] = useState(false);
    const [img, setImg] = useState('');
    const [checked, setChecked] = useState(false);
    const [id, setId] = useState('');

    const {path} = useLocation();
    useEffect(()=>{
        getAllData();
    },[path]);
    const getAllData = () => {
       
        getCustomers().then(data=>{
            setCustomers(data);
        })
    }

    const onVerify = (id) => {
        alert(id);
    }

    const handleClose = () =>setShowDefault(false);

    const openModal = (id) => {
        console.log("id:", id);
        setId(id);
        setShowDefault(true);
        getCustomerById(id)
        .then(data => {
            setImg(data.img);
            if(data.IDVerStatus == 1) { //verified
                setChecked(false);
            } else if(data.IDVerStatus == 2) { //non-verified
                setChecked(true);
            } 
        })
    }

    const onChangeCheck = (e) => {
        setChecked(e.target.checked);
        console.log("checked: ", checked);
    }

    const onSave = () => {
        updateIDVerification(id, !checked)
        .then(data => {
            setShowDefault(false);
        })
    }

    const TableRow = (props) => {
        const { id, customerName, email, phone, age, driverID, totalMoneyDeposit, hoursRide } = props;
    
        return (
          <tr>
            <th scope="row">{customerName}</th>
            <td>{email}</td>
            <td>{phone}</td>
            <td>{age}</td>
            <td>{driverID}</td>
            <td>{totalMoneyDeposit}</td>
            <td>{hoursRide}</td>
            <td>
                {/* <Button variant="secondary" className="m-1"
                onClick={(e)=> onVerify(id)}>Verify</Button> */}
                <Button variant="primary" className="my-3" onClick={() => openModal(id)}>IDVerify</Button>

                <Modal as={Modal.Dialog} centered show={showDefault} onHide={handleClose}>
                    <Modal.Header>
                    <Modal.Title className="h6">ID Verification</Modal.Title>
                    <Button variant="close" aria-label="Close" onClick={handleClose} />
                    </Modal.Header>
                    <Modal.Body>
                        <div className="user-avatar lg-avatar me-6" style={{height:"16rem", width:"10rem"}}>
                            <Image src={img} className="card-img-top border-white" />
                        </div>
                        <Form>
                            <Form.Check defaultChecked
                                onChange={onChangeCheck}
                                checked={checked}
                                type="switch"
                                label="ID Verification"
                                id="switch2"
                                htmlFor="switch2"
                                />
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                    <Button variant="secondary" onClick={onSave}>
                        Ok
                    </Button>
                    <Button variant="link" className="text-gray ms-auto" onClick={handleClose}>
                        Close
                    </Button>
                    </Modal.Footer>
                </Modal>
            </td>
          </tr>
        );
    };

    return (
        <>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>Customers</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                </Card.Header>

                <Table responsive className="align-items-center table-flush">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">Name</th>
                        <th scope="col">Email</th>
                        <th scope="col">Phone</th>
                        <th scope="col">Age</th>
                        <th scope="col">Drivers ID</th>
                        <th scope="col">Total money deposit</th>
                        <th scope="col">How many hours ride</th>
                        <th scope="col">ID verification</th>
                    </tr>
                    </thead>
                    <tbody>
                    {customers.map(ele => <TableRow key={`customer-${ele.id}`} {...ele} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    

    )
}
