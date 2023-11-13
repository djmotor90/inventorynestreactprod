//Import in all required hooks and dependencies
import { useEffect, useState }                    from "react";
import { useParams,useSearchParams }              from "react-router-dom";

//Import Bootstrap and styling components
import Container from 'react-bootstrap/Container';
import Row       from 'react-bootstrap/Row';
import Col       from 'react-bootstrap/Col';
import Card      from 'react-bootstrap/Card';
import Accordion from 'react-bootstrap/Accordion';
import Toast     from 'react-bootstrap/Toast';
import logo      from '../../assets/inventoryNestLogo.png';
//Import in homemade Components
import ShowCard     from '../ShowOneEntry/ShowCard';
import GeneralTable from "../GeneralTable";
import PurchaseForm from "../ShowOneEntry/PurchaseForm";
import TransferForm from "../ShowOneEntry/TransferForm";


function ShowProduct (){
    const { id } = useParams();
    //Check for incoming Toast Notifs
    //On success of an add, you will be redirected here and create a success toast notification
    const [searchParams, setSearchParams] = useSearchParams();
    const [toastShow, setToastShow] = useState(false);
    const [toastMessage,setToastMessage] = useState('');
    const checkForToast = () => {
        if (searchParams.get('purchaseSuccess')){
            setToastMessage('You have successfully purchased new inventory!')
            setToastShow(true);
        }
        else if (searchParams.get('transferSuccess')){
            setToastMessage('You have successfully transferred inventory!')
            setToastShow(true);
        }
        else if (searchParams.get('addSuccess')){
            setToastMessage('You have successfully added a new product!')
            setToastShow(true);
        }
        else if (searchParams.get('editSuccess')){
            setToastMessage('You have successfully edited your product!')
            setToastShow(true);
        }
    };
    //populating all needed data
    const [showFormData, setShowFormData] = useState(null);
    const [showTableData, setShowTableData] = useState(null);
    const [name, setName] = useState(null);
    const [tableLength, setTableLength] = useState(0);
    const [purchaseFormData, setPurchaseFormData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch(`http://localhost:3001/products/${id}`, {mode:'cors'});
          const data = await response.json();
          //lets add to each one the name of the route
          data.showFormInfo.path = 'products';
          setShowFormData(data.showFormInfo);
          //if the product isnt in any warehouses, this will be an empty array
           if (data.associateTable.length === 0){
                setTableLength(data.associateTable.length);
           }else{
                setShowTableData(data.associateTable);
                setTableLength(data.associateTable.length);
           }
          setName(data.showFormInfo.name);
          setPurchaseFormData({
            data       : data.purchaseForm.allWarehouses,
            ownerMoney : data.purchaseForm.ownerMoney,
            productCost: data.showFormInfo.list.product_provider_price,
            productId  : data.showFormInfo.id
         });
        }
        catch (e) {
          //eventually will have to do something
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        checkForToast();
        makeAPICall();
      }, []);
      //wait until data loads to populate your components
      const displayCard = showFormData && <ShowCard data={showFormData}/>;
      const displayperformanceCard = showFormData && <ShowCard data={showFormData}/>;
      const displayTable = showTableData ? <GeneralTable data={[showTableData, 'warehouse_id', 'warehouses']}/> : <h5> There are no warehouses currently storing this object. </h5>;
      const displayPurchaseForm = purchaseFormData && <PurchaseForm purchaseFormData={ purchaseFormData }/>;
      //the data above actually works for both, could rename to make it more clear
      const displayTransferForm = purchaseFormData && <TransferForm TransferFormData={ purchaseFormData }/>;
    return(
    <div>
        <Toast onClose={() => setToastShow(false)} data-bs-theme="dark" show={toastShow} delay={6000} autohide style = {{position:'fixed', right: '0', top: '10', width:'600px', height:'200px', zIndex:'10'}} bg='success'>
            <Toast.Header>
            <img
                src={logo}
                className="rounded me-2"
                alt=""
                width='40px'
                height='40px'
            />
            <strong className="me-auto">Inventory Nest</strong>
            <small>Just Now</small>
            </Toast.Header>
            <Toast.Body style={{color:'white'}}> {toastMessage} </Toast.Body>
        </Toast>
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
                                {displayTransferForm}
                            </Accordion.Body>
                        </Accordion.Item>
                        <Accordion.Item eventKey="1">
                            <Accordion.Header>Purchase More of {name}</Accordion.Header>
                            <Accordion.Body>
                                {displayPurchaseForm}
                            </Accordion.Body>
                        </Accordion.Item>
                    </Accordion>
                </Card.Body>
                </Card>
            </Row>
        </Container>
    </div>
    )
}
export default ShowProduct;