//Note: this could probably just be generalized out to form eventually, but fr now this will generate just blank forms
//Import in all required hooks and dependencies
import { useEffect, useState }    from "react";
import { useNavigate}             from "react-router";
//Import  in all components
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col    from 'react-bootstrap/Col';
import Row    from 'react-bootstrap/Row';

function TransferForm ({ TransferFormData }){
    let data = TransferFormData.data;
    let productId = TransferFormData.productId
    const navigate = useNavigate();
    //the only three things the backend needs for this
    const INITIAL_STATE = {
        warehouseTo    : '',
        warehouseFrom  : '',
        amount         : 0,
        productId      : productId,
        typeof         : 'transfer'
    };
    //the data for sending to the server
    const [transferData, setTransferData] = useState(INITIAL_STATE);
    //the stock that will be displayed on warehouse change
    const [toCurrentStock, setToCurrentStock] = useState(0);
    const [fromCurrentStock, setFromCurrentStock] = useState(0);
    const [maxValue,setMaxValue] = useState(0);
    //using some inbuilt bootstrap validation
    const [validated, setValidated] = useState(false);
    //bootstrap has some weird things on the validation and you cant really use custom validations. Since the prod price never changes
    //im just gonna find the max number that doesnt put ownermoney in the negatives
    //form parts
    const displayWarehouseSelect = data.map(warehouse => {
        let selectName = `${warehouse.warehouse_name} (${warehouse.warehouse_state})`;
        return(
            <option key={warehouse.warehouse_id} value={warehouse.warehouse_id} >{selectName}</option>
        )
    });
    //Next, on user input, update any state variable (this likely wont work for files, i will have to find that out later)
    const handleChange =  (event) =>{

        setTransferData({ ...transferData, [event.target.name] : event.target.value });
    };
    useEffect(() => {
        if (transferData !== INITIAL_STATE)
        {
            //if your to and from are empty
            if (transferData.warehouseTo == "" && transferData.warehouseFrom == "" ){
                setToCurrentStock(0);
                setFromCurrentStock(0);
                setMaxValue(0);
            }
            else if (transferData.warehouseTo == "")
            {
                setToCurrentStock(0);
                //find the from warehouses current stock
                const fromWarehouse = data.find(warehouse => warehouse.warehouse_id == transferData.warehouseFrom);
                setFromCurrentStock(fromWarehouse.current_stock_level);
                setMaxValue(fromWarehouse.current_stock_level);
            }
            else if (transferData.warehouseFrom == "")
            {
                setFromCurrentStock(0);
                //find the from warehouses current stock
                const toWarehouse = data.find(warehouse => warehouse.warehouse_id == transferData.warehouseTo);
                setToCurrentStock(toWarehouse.current_stock_level);
                setMaxValue(0);
            }
            else
            {
                const toWarehouse = data.find(warehouse => warehouse.warehouse_id == transferData.warehouseTo);
                const fromWarehouse = data.find(warehouse => warehouse.warehouse_id == transferData.warehouseFrom);
                setFromCurrentStock(parseInt(fromWarehouse.current_stock_level) - parseInt(transferData.amount));
                setToCurrentStock(parseInt(toWarehouse.current_stock_level) + parseInt(transferData.amount));
            }
        }
    }, [transferData])
    // Next, on user submit, we will post to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        //lets do some front end validation
        const form = event.currentTarget;
        if (form.checkValidity() === false && warehouseFrom == warehouseTo) {
          event.preventDefault();
          event.stopPropagation();
          setValidated(true);
        }
        else
        {
            setValidated(true);
            const url = (`http://localhost:3001/products/${productId}`);
            const response = await fetch(url, {
                method : 'POST',
                headers: {
                    'accept'       : 'application/json',
                    'content-type' : 'application/json'
                },
                body   : JSON.stringify(transferData)
            },{mode:'cors'});
            if(response.status !== 201){
                //TODO handle this error
                console.log('error')
                const message = await response.json();
            }
            else{
                const message = await response.json();
                navigate(`/products/${productId}?transferSuccess=true`);
                navigate(0);
            }
        }
    }
    return(
        
        <Form data-bs-theme="dark" onSubmit={handleSubmit}  noValidate validated={validated} >
            
             <Row mt-5>
                <Col md={5}>
            <Form.Group className="mb-3">
            <Form.Label > Select Warehouse to Send From: </Form.Label>
            <Form.Select aria-label="Default select example" name='warehouseFrom' required onChange={handleChange} value={transferData.warehouseFrom}>
                <option name='warehouseFrom' value="">Select a Warehouse</option>
                {displayWarehouseSelect}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                    Please choose a warehouse
            </Form.Control.Feedback>
            </Form.Group>
             <Form.Group className="mb-3">
                    <Form.Label> This Warehouse currently has this many in stock: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" value={fromCurrentStock} disabled readOnly/>
                    </Col>
            </Form.Group>
            </Col>      
            
            <Col xs={5}>
                    <Form.Group className="mb-3">
                    <Form.Label> Transfer Amount </Form.Label>
                    <Col sm="10">
                        <Form.Control required onChange={handleChange} type="number" name='amount' min="1" max={maxValue} value={transferData.amount}/>
                    </Col>
                    <Form.Control.Feedback type="invalid">
                        Please choose an amount that does not exceed the amount available
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
            <Form.Label > Select Warehouse to Send To: </Form.Label>
            <Form.Select aria-label="Default select example" name='warehouseTo' required onChange={handleChange} value={transferData.warehouseTo}>
                <option name='warehouse_id' value="">Select a Warehouse</option>
                {displayWarehouseSelect}
            </Form.Select>
            <Form.Control.Feedback type="invalid">
                    Please choose a warehouse
            </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label> This Warehouse currently has this many in stock: </Form.Label>
                    <Col sm="10">
                        <Form.Control type="number" value={toCurrentStock} disabled readOnly/>
                    </Col>
             </Form.Group>
             </Col>       

             <Col md={{ span: 6, offset: 3 }}>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 0 }}>
                <Button type="submit"> Make a Transfer</Button>
                </Col>
            </Form.Group>
            </Col>  
          
            
           </Row>
           
        </Form>
        
    );
    
}
export default TransferForm;