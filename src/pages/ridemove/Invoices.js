import React, { useState, Fragment, useEffect } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { getInvoices } from "../../firebaselmp/js/InvoicesService";
import { useLocation } from "react-router-dom";

export default () => {
    const [invoices, setInvoices] = useState([]);
    const {path} = useLocation();
    useEffect(()=>{
        getAllData();
    },[path]);
    var getAllData = () => {
       
        getInvoices().then(data=>{
            console.log("data: ", data);
            setInvoices(data);
        })
    }
    const pageVisits = [
        { customerName: "tyler", customerID: "tyler", email: "tyler@gmail.com", distanceRide: "2km", timeRide: "2hr", cost: "5CAD"},
    ];
    const TableRow = (props) => {
        const {  customerName, customerID,  email, distanceRide, timeRide, cost } = props;
    
        return (
          <tr>
            <th scope="row">{customerName}</th>
            <td>{customerID}</td>
            <td>{email}</td>
            <td>{distanceRide}</td>
            <td>{timeRide}</td>
            <td>{cost}</td>
            <td></td>
          </tr>
        );
      };


    return (
        <>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>invoices</h5>
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
                        <th scope="col">Customer ID</th>
                        <th scope="col">Email</th>
                        <th scope="col">Distance Ride</th>
                        <th scope="col">Time Ride</th>
                        <th scope="col">Cost</th>
                        <th scope="col">Path</th>
                    </tr>
                    </thead>
                    <tbody>
                    {invoices.map(ele => <TableRow key={`page-visit-${ele.id}`} {...ele} />)}
                    </tbody>
                </Table>
            </Card>
        </>
    

    )
}
