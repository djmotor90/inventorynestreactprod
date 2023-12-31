//Import all hooks and dependencies
import { Link }                from "react-router-dom";

//Import in all bootstrap components
import Card from 'react-bootstrap/Card';

function ReportingCard({ data }) {
    //helper function to convert date to pretty format
    const makeDate = (longDate) =>
    {
       return new Date(longDate).toUTCString();
    }
    const cards = () => {
        return(
            data.map((element, i) => (
            <div key={i} style={{marginBottom:'20px'}}>
                <Card data-bs-theme="dark">
                    <Card.Body>
                        <Card.Title>Recent Transfer </Card.Title>
                        <Card.Subtitle className="mb-2 text-muted">{makeDate(data[i].transfer_date)}</Card.Subtitle>
                        <Card.Text>
                            To: {data[i].warehouse_to.warehouse_name}
                            <br/>
                            From:{data[i].warehouse_from.warehouse_name}
                            <br/>
                            Product: {data[i].product.product_name}
                        </Card.Text>
                        <Card.Link> <Link to={`/warehouses/${data[i].warehouse_from.warehouse_id}`} relative="path" > View From </Link></Card.Link>
                        <Card.Link>  <Link to={`/warehouses/${data[i].warehouse_to.warehouse_id}`} relative="path" > View To </Link> </Card.Link>
                        <Card.Link>  <Link to={`/products/${data[i].product.product_id}`} relative="path" > View Product </Link> </Card.Link>

                    </Card.Body>
                </Card>
            </div>
            ))
        );
    }
    return(
        <Card style={{ width: '570px'}} id="reportingCard" data-bs-theme="dark">
            <Card.Header> <h3>Activity</h3> </Card.Header>
            <Card.Body>
                {cards()}
            </Card.Body>
        </Card>
    );
}

export default ReportingCard;