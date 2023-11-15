//Import all hooks and dependencies
import { Link }                from "react-router-dom";
import { useNavigate}  from "react-router-dom";
//Import in all bootstrap components
import Card      from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button    from 'react-bootstrap/Button';

function LandingCard({ data }) {    //there are 4 general categories, analystic report
    const navigate = useNavigate();
    const handleAllCustomersClick = () =>{
      navigate(`/${data.path}/${data.id}/Customers`);
       };
        const handleAllWarehousesClick = () =>{
         navigate(`/${data.path}/${data.id}/Warehouses`);
          };
          const handleAllSalesClick = () =>{
           navigate(`/${data.path}/${data.id}/Sales`);
            };
             const handlePerformanceAnalyticsClick = () =>{
              navigate(`/${data.path}/${data.id}/reporting`);
               };

            const displayList = Object.keys(data.list).map((item) => {
                return(
                  <ListGroup.Item key={item}>
                    
                  </ListGroup.Item>
                )});
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
                        <Button variant="btn btn-primary" onClick={() => handleViewAllCustomersk()}> View All Customers </Button>
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
                        <Button variant="btn btn-primary" onClick={() => handleViewAllWarehouses()}> View All Warehouses </Button>
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
                        <Button variant="btn btn-primary" onClick={() => handleViewAllSales()}> View All Sales </Button>
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
                        <Button variant="btn btn-primary" onClick={() => handleViewPerformanceAnalytics()}> View Performance Analytics </Button>
                    </Card.Body>
                </Card>
            </ListGroup.Item>
        </ListGroup>
    );
    }

export default LandingCard;