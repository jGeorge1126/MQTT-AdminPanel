import React, {useState, useEffect } from 'react';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';

import { deletePricing, getPricings } from '../../firebaselmp/js/PricingsService';
import { useLocation } from 'react-router-dom';
import { Routes } from '../../routes';
import { useHistory } from "react-router-dom";
import { deleteUserAgreement, getUserAgreements } from '../../firebaselmp/js/UserAgreementService';

export default () => {

    // plan: Plan1, usagetime: 30min, cost: "$0.23 USD/min"
    const [userAgreements, setUserAgreements] = useState([]);
    const {path} = useLocation();
    useEffect(()=>{
        getAllData();
    },[path]);

    const getAllData = () => {
        getUserAgreements().then(data => {
            console.log("data: ", data);
            setUserAgreements(data);
        });
    }

    const history = useHistory();
    const navigateTo = () => history.push('/user-agreement/add');

    const onEdit = (id) => {
        history.push({
            pathname:'/user-agreement/edit',
            id: id
        });
    }

    const onDelete = (id) => {
        deleteUserAgreement(id)
        .then(data => {
            alert("succes")
            window.location.reload();
        })
        .catch(e =>{
            alert("fail");
        });

    }

    const TableRow = (props) => {
        const { id, title, description} = props;
    
        return (
          <tr>
            <th scope="row">{title}</th>
            <td>{description}</td>
            <td>
                <Button variant="secondary" className="m-1"
                onClick={(e)=> onEdit(id)}>Edit</Button>
                <Button variant="secondary" className="m-1"
                onClick={(e)=> onDelete(id)}>Delete</Button>
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
                        <h5>User Agreement</h5>
                    </Col>
                    <Col className="text-end">
                        {/* <Button variant="secondary" size="sm">See all</Button> */}
                    </Col>
                    </Row>
                    <Button variant="secondary" className="m-1" onClick={navigateTo}>Add</Button>
                </Card.Header>


                <Table responsive className="align-items-center table-flush">
                    <thead className="thead-light">
                    <tr>
                        <th scope="col">title</th>
                        <th scope="col">description</th>
                        <th scope="col">oper</th>
                    </tr>
                    </thead>
                    <tbody>
                    {userAgreements.map(ele => <TableRow key={`userAgreement-${ele.id}`} {...ele} />)}
                    </tbody>
                </Table>
            </Card>
        </>
        
    )
}
