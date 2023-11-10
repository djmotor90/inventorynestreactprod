//Import all hooks and dependencies
import { Link }                from "react-router-dom";

//Import in all bootstrap components
import Card from 'react-bootstrap/Card';

function LandingCard({ data }) {
    //make a 2x2 grid

    return(

        <Card style={{ width: '20rem'}} id="reportingCard" data-bs-theme="dark">
            <Card.Body>
                <Card.Title> Welcome Home </Card.Title>
            </Card.Body>
        </Card>
    );
}

export default LandingCard;