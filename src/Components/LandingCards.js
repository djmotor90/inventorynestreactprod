//Import all hooks and dependencies
import { useNavigate}  from "react-router-dom";
//Import in all bootstrap components
import Card      from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button    from 'react-bootstrap/Button';





function LandingCard({ data }) {    
    const navigate = useNavigate();
    const handleViewAllCustomersClick = () =>{navigate(`/customers`);};
    const handleViewAllWarehousesClick = () =>{navigate(`/warehouses`);};
    const handleViewAllSalesClick = () =>{navigate(`/sales`);};
    const handleViewPerformanceAnalyticsClick = () =>{navigate(`/reporting`);};
   return(
        <ListGroup horizontal data-bs-theme="dark">
            <ListGroup.Item>
                <Card>
                    <Card.Img variant="top" src="https://placehold.co/600x400" />
                    <Card.Body>
                        <Card.Title> Customers </Card.Title>
                        <Card.Text>
                                Currently you are serving {data.customerCount} customers across the United States.
                        </Card.Text>
                        <Button variant="btn btn-primary" onClick={() => handleViewAllCustomersClick()}> View All Customers </Button>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
            <ListGroup.Item>
                <Card>
                    <Card.Img variant="top" src="https://placehold.co/600x400" />
                    <Card.Body>
                        <Card.Title> Warehouses </Card.Title>
                        <Card.Text>
                                Currently you are running {data.warehouseCount} warehouses across the United States.
                        </Card.Text>
                        <Button variant="btn btn-primary" onClick={() => handleViewAllWarehousesClick()}> View All Warehouses </Button>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
            <ListGroup.Item>
                <Card>
                    <Card.Img variant="top" src="https://placehold.co/600x400" />
                    <Card.Body>
                        <Card.Title> Sales </Card.Title>
                        <Card.Text>
                                In total, you have made {data.salesCount} individual product sales.
                        </Card.Text>
                        <Button variant="btn btn-primary" onClick={() => handleViewAllSalesClick()}> View All Sales </Button>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
            <ListGroup.Item>
                <Card>
                    <Card.Img variant="top" src="https://placehold.co/600x400" />
                    <Card.Body>
                        <Card.Title> Revenue </Card.Title>
                        <Card.Text>
                                Grossly, you have made {data.revenueCount} dollars
                        </Card.Text>
                        <Button variant="btn btn-primary" onClick={() => handleViewPerformanceAnalyticsClick()}> View Performance Analytics </Button>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        </ListGroup>
    );
    }

export default LandingCard;