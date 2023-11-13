//Import in all required hooks and dependencies
import { useEffect, useState }    from "react";
import { useNavigate,useParams }  from "react-router-dom";
//Import Bootstrap and styling components
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Button    from 'react-bootstrap/Button';
import Card      from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
//Import in homemade Components
import ShowCard     from '../ShowOneEntry/ShowCard';
import GeneralTable from "../GeneralTable";
import PurchaseForm from "../ShowOneEntry/PurchaseForm";


function ShowProduct (){
    const { id } = useParams();
    //const navigate = useNavigate();
    const [showFormData, setShowFormData] = useState(null);
    const [showTableData, setShowTableData] = useState(null);
    const [name, setName] = useState(null);
    const [tableLength, setTableLength] = useState(0);
    const [ownerMoney, setOwnerMoney] = useState(0);
    const [purchaseFormData, setPurchaseFormData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch(`http://localhost:3001/products/${id}`, {mode:'cors'});
          const data = await response.json();
          //lets add to each one the name of the route
          data.showFormInfo.path = 'products';
          setShowFormData(data.showFormInfo);
          setShowTableData(data.associateTable);
          setName(data.showFormInfo.name);
          setTableLength(data.associateTable.length);
          setPurchaseFormData({
            data       : data.purchaseForm.allWarehouses,
            ownerMoney : data.purchaseForm.ownerMoney,
            productCost: data.showFormInfo.list.product_provider_price,
            productId  : data.showFormInfo.id
         });
         setOwnerMoney(data.purchaseForm.ownerMoney)
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
      const displayperformanceCard = showFormData && <ShowCard data={showFormData}/>;
      const displayTable = showTableData && <GeneralTable data={[showTableData, 'warehouse_id', 'warehouses']}/>;
      const displayPurchaseForm = purchaseFormData && <PurchaseForm purchaseFormData={ purchaseFormData }/>;
    return(
        <Container fluid>
            <Row>
                <Col className = 'd-flex justify-content-center'>{displayCard}</Col>
                <Col className = 'd-flex justify-content-center'> {displayperformanceCard}</Col>
             </Row>
            <Row style={{padding:'40px'}}>  
            <Card data-bs-theme="dark">
                <Card.Header as="h5">{name} Is Present In {tableLength} Warehouses </Card.Header>
                <Card.Body>
                    <Card.Text>
                      Click any entry below to view the warehouse information
                    </Card.Text>
                    <Col> {displayTable} </Col>
                    <Accordion defaultActiveKey="1">
                        <Accordion.Item eventKey="0">
                            <Accordion.Header>Transfer {name} Between Warehouses</Accordion.Header>
                            <Accordion.Body>

                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Purchase More {name}</Accordion.Header>
                            <Accordion.Body>
                                <h5 style={{textAlign:'right', color:'green'}}> You currently have ${ownerMoney} dollars to spend </h5>
                                {displayPurchaseForm}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                </Card>
            </Row>
        </Container>
    )
}
export default ShowProduct;