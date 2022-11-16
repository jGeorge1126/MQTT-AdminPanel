import L from "leaflet";
import React, { useState, useEffect, Fragment } from "react";
import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faAngleUp, faArrowDown, faArrowUp, faEdit, faEllipsisH, faExternalLinkAlt, faEye, faTrashAlt } from '@fortawesome/free-solid-svg-icons';
import { Col, Row, Nav, Card, Button, Table, Dropdown, ProgressBar, Pagination, ButtonGroup } from '@themesberg/react-bootstrap';
import { pageVisits } from "../data/tables";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import socketIOClient from "socket.io-client";
import RoutineMachine from "./RountineMachine";
import "../assets/img/lite_ride/withoutbattery.png";

const ENDPOINT = "http://127.0.0.1:8080";
// const ENDPOINT = "http://54.89.211.240:8080";
const socket = socketIOClient(ENDPOINT);
const centerPosition = [43.6532, -79.3832];

var icon = L.icon({
  iconUrl: 
//    "https://cdn0.iconfinder.com/data/icons/small-n-flat/24/678111-map-marker-512.png",
  require("../assets/img/lite_ride/withoutbattery.png"),
  
  iconSize: [30, 30]
})

export const PageVisitsTable = () => {
  const TableRow = (props) => {
    const { pageName, views, returnValue, bounceRate } = props;
    const bounceIcon = bounceRate < 0 ? faArrowDown : faArrowUp;
    const bounceTxtColor = bounceRate < 0 ? "text-danger" : "text-success";

    return (
      <tr>
        <th scope="row">{pageName}</th>
        <td>{views}</td>
        <td>${returnValue}</td>
        <td>
          <FontAwesomeIcon icon={bounceIcon} className={`${bounceTxtColor} me-3`} />
          {Math.abs(bounceRate)}%
        </td>
      </tr>
    );
  };

  return (
    <Card border="light" className="shadow-sm">
      <Card.Header>
        <Row className="align-items-center">
          <Col>
            <h5>Page visits</h5>
          </Col>
          <Col className="text-end">
            <Button variant="secondary" size="sm">See all</Button>
          </Col>
        </Row>
      </Card.Header>
      <Table responsive className="align-items-center table-flush">
        <thead className="thead-light">
          <tr>
            <th scope="col">Page name</th>
            <th scope="col">Page Views</th>
            <th scope="col">Page Value</th>
            <th scope="col">Bounce rate</th>
          </tr>
        </thead>
        <tbody>
          {pageVisits.map(pv => <TableRow key={`page-visit-${pv.id}`} {...pv} />)}
        </tbody>
      </Table>
    </Card>
  );
};

export const AvailableScooters = (params) => {
  const history = useHistory();
  const [scootermarkers, setScootermarker] = useState([]);
  const [scooterStatus, setScooterStatus] = useState([]);
  useEffect(() => {
    let isMounted = true
    socket.on("sendMessage", data => {
      var jsonResult = JSON.parse(data.text);
      if(params.type === "scooterdetail"){
        if(jsonResult.i === params.scooterID){
          setScooterStatus(p => {
            let temp = [...p]
            temp = [
              jsonResult,
              ...temp
            ]
            return [...temp]
          });
        }
      }
      let updatedvalue = {
        i: jsonResult.i,
      };
      const prevScooterIndex = scootermarkers.findIndex(s => s.i === jsonResult.i)
      if (prevScooterIndex !== -1) {
        updatedvalue = {
          ...scootermarkers[prevScooterIndex],
        }
      }

      if(jsonResult.a == 19){
        var temp = jsonResult.g.split(",");
        
        updatedvalue.lat = temp[0]
        updatedvalue.lng = temp[1]
      } else if(jsonResult.a == 27){
        updatedvalue.b = jsonResult.b
        updatedvalue.c = jsonResult.c
      }
      
      if (isMounted) {
        setScootermarker(p => {
          let prevScooters = [...p]
          const prevScooterIndex = p.findIndex(s => s.i === updatedvalue.i)
          if (prevScooterIndex === -1) {
            prevScooters.push(updatedvalue)
          } else {
            prevScooters[prevScooterIndex] = {
              ...prevScooters[prevScooterIndex],
              ...updatedvalue
            }
          }
          return [...prevScooters]
        })
      }
    });
    return () => {isMounted = false}
  }, []);
  if(params.type === "available"){
    return (
      <Card border="light" className="shadow-sm p-4">
        <MapContainer
          doubleClickZoom={false}
          id="availablescootersmap"
          zoom={14}
          center={centerPosition}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(scootermarkers || []).filter(s => s.lat && s.lng && s.b > 20).map(s => 
              <Marker position={[s.lat, s.lng]} key={s.i} icon={icon} >
                <Popup>
                  ID: { s.i }<br/>
                  Location: { s.lat }, { s.lng }<br/>
                  Battery: { s.b >= 0 ? s.b : '' }%<br/>
                  Status: { s.c == 0 ? 'On' : 'Off' }
                </Popup>
              </Marker>
            )
          }
          {/* <RoutineMachine /> */}
        </MapContainer>
      </Card>
    );
  } else if (params.type === "inuse") {
    return (
      <Card border="light" className="shadow-sm p-4">
        <MapContainer
          doubleClickZoom={false}
          id="availablescootersmap"
          zoom={14}
          center={centerPosition}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(scootermarkers || []).filter(s => s.lat && s.lng && s.c == 0).map(s => 
              <Marker position={[s.lat, s.lng]} key={s.i} icon={icon} >
                <Popup>
                  ID: { s.i }<br/>
                  Location: { s.lat }, { s.lng }<br/>
                  Battery: { s.b >= 0 ? s.b : '' }%<br/>
                  Status: { s.c == 0 ? 'On' : 'Off' }
                </Popup>
              </Marker>
            )
          }
          {/* <RoutineMachine /> */}
        </MapContainer>
      </Card>
    );
  } else if (params.type === "lowbattery") {
    return (
      <Card border="light" className="shadow-sm p-4">
        <MapContainer
          doubleClickZoom={false}
          id="availablescootersmap"
          zoom={14}
          center={centerPosition}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(scootermarkers || []).filter(s => s.lat && s.lng && s.b < 20).map(s => 
              <Marker position={[s.lat, s.lng]} key={s.i} icon={icon} >
                <Popup>
                  ID: { s.i }<br/>
                  Location: { s.lat }, { s.lng }<br/>
                  Battery: { s.b >= 0 ? s.b : '' }%<br/>
                  Status: { s.c == 0 ? 'On' : 'Off' }
                </Popup>
              </Marker>
            )
          }
          {/* <RoutineMachine /> */}
        </MapContainer>
      </Card>
    );
  } else if (params.type === "all") {
    return (
      <Card border="light" className="shadow-sm p-4">
        <MapContainer
          doubleClickZoom={false}
          id="availablescootersmap"
          zoom={14}
          center={centerPosition}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {(scootermarkers || []).filter(s => s.lat && s.lng).map(s => 
              <Marker
                position={[s.lat, s.lng]}
                key={s.i}
                icon={icon} 
                eventHandlers={{
                  click: () => {
                    console.log(s);
                    // navigate(`/ScooterDetail`,{state:s});
                    history.push({
                      pathname: '/detail/' + s.i,
                      state: s,
                    }); 
                  },
                }}
              >
                <Popup>
                  ID: { s.i }<br/>
                  Location: { s.lat }, { s.lng }<br/>
                  Battery: { s.b >= 0 ? s.b : '' }%<br/>
                  Status: { s.c == 0 ? 'On' : 'Off' }
                </Popup>
              </Marker>
            )
          }
          {/* <RoutineMachine /> */}
        </MapContainer>
      </Card>
    );
  } else if (params.type === "scooterdetail") {
    return (
      <Card border="light" className="shadow-sm p-4 overflow-auto" style={{height: "600px"}}>
        {scooterStatus.map((s, i) => (
          <span key={`${i}${s.i}`}>{JSON.stringify(s)}</span>
        ))}
      </Card>
    )
  }
  
};