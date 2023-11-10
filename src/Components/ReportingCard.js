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
            <div style={{marginBottom:'20px'}}>
                <Card  key={i} data-bs-theme="dark">
                    <Card.Body>
                    <Card.Title>Recent Transfer </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted">{makeDate(data[i].transfer_date)}</Card.Subtitle>
                    <Card.Text>
                        To: {data[i].warehouse_to.warehouse_name}
                        <br/>
                        From:{data[i].warehouse_from.warehouse_name}
                    </Card.Text>
                    <Card.Link> <Link to={`/warehouses/${data[i].warehouse_from.warehouse_id}`} relative="path" > View From </Link></Card.Link>
                    <Card.Link>  <Link to={`/warehouses/${data[i].warehouse_to.warehouse_id}`} relative="path" > View To </Link> </Card.Link>
                    </Card.Body>
                </Card>
            </div>
            ))
        );
    }
    return(
        <Card style={{ width: '20rem'}} id="reportingCard" data-bs-theme="dark">
            <Card.Body>
                <Card.Title> Activity </Card.Title>
                {cards()}
            </Card.Body>
        </Card>
    );
}

export default ReportingCard;