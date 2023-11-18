//import all dependencies and Hooks
import { useEffect, useState }           from "react";
import { useNavigate, useLocation}       from "react-router-dom";
//import in all bootstrap components
import Card        from 'react-bootstrap/Card';
import ListGroup   from 'react-bootstrap/ListGroup';
import Row         from 'react-bootstrap/Row';
import Col         from 'react-bootstrap/Col';
//import in all needed components
import BarPlot   from '../BarPlot';
//import in all assets



function AnalyticsCard ({ data }){
    const displayList = Object.keys(data.list).map((item) => {
      return(
        <ListGroup.Item key={item}>
          <Row>
            <Col sm={6}>{item}:</Col>
            <Col sm={6}>{data.list[item]}</Col>
          </Row>
        </ListGroup.Item>
      )});
    return(
        <Card style={{ width: '38rem' }} data-bs-theme="dark" >
                <BarPlot data = {data.barData} type = 'quantity'/>
            <Card.Body>
            <Card.Title>Performance Analytics:</Card.Title>
            <ListGroup className="list-group-flush">
                {displayList}
            </ListGroup>
            </Card.Body>

        </Card>
    );
};
export default AnalyticsCard;
