import React, {useState, useEffect } from 'react';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';

import { getPricings } from '../../firebaselmp/js/PricingsService';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../routes';
import { useHistory } from "react-router-dom";

export default () => {

    // plan: Plan1, usagetime: 30min, cost: "$0.23 USD/min"
    const [pricings, setPricings] = useState([]);
    const {path} = useLocation();
    useEffect(()=>{
        getAllData();
    },[path]);

    const getAllData = () => {
       
        getPricings().then(data=>{
            console.log("data: ", data);
            setPricings(data);
        })
    }

    const onEdit = (id) => {
        //alert(id);
        alert("aa");
    }

    const onDelete = (id) => {
        //alert(id);
    }

    const TableRow = (props) => {
        const { id, plan, usageTime, cost } = props;
    
        return (
          <tr>
            <th scope="row">{plan}</th>
            <td>{usageTime}</td>
            <td>{cost}</td>
            <td>
                <Button variant="secondary" className="m-1" onClick={onEdit(id)}>Edit</Button>
                <Button variant="secondary" className="m-1" onClick={onDelete(id)}>Delete</Button>
            </td>
          </tr>
        );
    };

    const history = useHistory();
    const navigateTo = () => history.push('/pricing/add');
    return (
        <>
            <Button variant="secondary" className="m-1" onClick={navigateTo}>Add</Button>
            <Card border="light" className="shadow-sm">
                <Card.Header>
                    <Row className="align-items-center">
                    <Col>
                        <h5>Pricings</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                </Card.Header>


                <Table responsive className="align-items-center table-flush">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">plan</th>
                        <th scope="col">usageTime</th>
                        <th scope="col">cost</th>
                        <th scope="col">oper</th>
                    </tr>
                    </thead>
                    <tbody>
                    {pricings.map(ele => <TableRow key={`pricing-${ele.id}`} {...ele} />)}
                    </tbody>
                </Table>
            </Card>
        </>
        
    )
}
