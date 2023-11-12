//Import in all required hooks and dependencies
import { useEffect, useState }    from "react";
import { useNavigate,useParams }  from "react-router-dom";
//Import Bootstrap and styling components
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Button    from 'react-bootstrap/Button';
import Card      from 'react-bootstrap/Card';
//Import in homemade Components
import ShowCard     from '../ShowOneEntry/ShowCard';
import GeneralTable from "../GeneralTable";


function ShowProduct (){
    const { id } = useParams();
    //const navigate = useNavigate();
    const [showFormData, setShowFormData] = useState(null);
    const [showTableData, setShowTableData] = useState(null);
    const [name, setName] = useState(null);
    const [tableLength, setTableLength] = useState(0);
    const makeAPICall = async () => {
        try {
          const response = await fetch(`http://localhost:3001/products/${id}`, {mode:'cors'});
          const data = await response.json();
          //lets add to each one the name of the route
          data.showFormInfo.path = 'products';
          console.log(data.associateTable)
          setShowFormData(data.showFormInfo);
          setShowTableData(data.associateTable);
          setName(data.showFormInfo.name);
          setTableLength(data.associateTable.length)
        }
        catch (e) {
          //eventually will have to do something
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //wait until data loads to populate your components
      const displayCard = showFormData && <ShowCard data={showFormData}/>;
      const performanceCard = showFormData && <ShowCard data={showFormData}/>;
      const displayTable = showTableData && <GeneralTable data={[showTableData, 'warehouse_id', 'warehouses']}/>;
    return(
        <Container fluid>
            <Row >
                <Col className = 'd-flex justify-content-center'>{displayCard}</Col>
                <Col> {performanceCard}</Col>
             </Row>
            <Row>  
            <Card data-bs-theme="dark">
                <Card.Header as="h5">{name} Is Present In {tableLength} Warehouses </Card.Header>
                <Card.Body>
                    <Card.Text>
                      Click any entry below to view the warehouse information
                    </Card.Text>
                    <Col> {displayTable} </Col>
                    <Button variant="primary"> Transfer Product between Warehouses</Button>
                </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}
export default ShowProduct;