//Import all hooks and dependencies
import { Link }                from "react-router-dom";

//Import in all bootstrap components
import Card      from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button    from 'react-bootstrap/Button';

function LandingCard({ data }) {
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
                        <Button variant="primary"> View All Customers </Button>
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
                        <Button variant="primary"> View All Warehouses </Button>
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
                        <Button variant="primary"> View All Sales </Button>
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
                        <Button variant="primary"> View Performance Analytics </Button>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        </ListGroup>
    );
}

export default LandingCard;