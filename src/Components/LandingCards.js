//Import all hooks and dependencies
import { useNavigate}  from "react-router-dom";
//Import in all bootstrap components
import Card      from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button    from 'react-bootstrap/Button';





function LandingCard({ data }) {    
    const navigate = useNavigate();
    const handleViewAllCustomers = () =>{navigate(`/customers`);};
    const handleViewAllWarehouses = () =>{navigate(`/warehouses`);};
    const handleViewAllSales = () =>{navigate(`/sales`);};
    const handleViewPerformanceAnalytics = () =>{navigate(`/reporting`);};
   return(
    <ListGroup horizontal data-bs-theme="dark">
    <ListGroup.Item>
        <Card className="h-100 d-flex flex-column">
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body className="flex-grow-1">
                <Card.Title> Customers </Card.Title>
                <Card.Text>
                    Currently you are serving {data.customerCount} customers across the United States.
                </Card.Text>
            </Card.Body>
            <Button variant="btn btn-primary" onClick={() => handleViewAllCustomers()}> View All Customers </Button>
        </Card>
    </ListGroup.Item>
    <ListGroup.Item>
        <Card className="h-100 d-flex flex-column">
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body className="flex-grow-1">
                <Card.Title> Warehouses </Card.Title>
                <Card.Text>
                    Currently you are running {data.warehouseCount} warehouses across the United States.
                </Card.Text>
            </Card.Body>
            <Button variant="btn btn-primary" onClick={() => handleViewAllWarehouses()}> View All Warehouses </Button>
        </Card>
    </ListGroup.Item>
    <ListGroup.Item>
        <Card className="h-100 d-flex flex-column">
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body className="flex-grow-1">
                <Card.Title> Sales </Card.Title>
                <Card.Text>
                    In total, you have made {data.salesCount} individual product sales.
                </Card.Text>
            </Card.Body>
            <Button variant="btn btn-primary" onClick={() => handleViewAllSales()}> View All Sales </Button>
        </Card>
    </ListGroup.Item>
    <ListGroup.Item>
        <Card className="h-100 d-flex flex-column">
            <Card.Img variant="top" src="https://placehold.co/600x400" />
            <Card.Body className="flex-grow-1">
                <Card.Title> Revenue </Card.Title>
                <Card.Text>
                    Grossly, you have made {data.revenueCount} dollars.
                </Card.Text>
            </Card.Body>
            <Button variant="btn btn-primary" onClick={() => handleViewPerformanceAnalytics()}> View Performance </Button>
        </Card>
    </ListGroup.Item>
</ListGroup>
);
}

export default LandingCard;