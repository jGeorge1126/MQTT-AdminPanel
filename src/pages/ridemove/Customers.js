import React, { useState, useEffect, Fragment } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getCustomers } from "../../firebaselmp/js/CustomersService";
import { useLocation } from 'react-router-dom';

export default () => {
    const [customers, setCustomers] = useState([]);
    const {path} = useLocation();
    useEffect(()=>{
        getAllData();
    },[path]);
    const getAllData = () => {
       
        getCustomers().then(data=>{
            console.log("data: ", data);
            setCustomers(data);
        })
    }

    const onVerify = (id) => {
        alert(id);
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
                <Button variant="secondary" className="m-1"
                onClick={(e)=> onVerify(id)}>Verify</Button>
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
