//Note: this could probably just be generalized out to form eventually, but fr now this will generate just blank forms
//Import in all required hooks and dependencies
import { useEffect, useState }    from "react";
import { useNavigate}            from "react-router";
//Import  in all components
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col    from 'react-bootstrap/Col';
import Row    from 'react-bootstrap/Row';

function PurchaseForm ({ purchaseFormData }){
    let { data, ownerMoney, productCost, productId } = purchaseFormData;
    const navigate = useNavigate();
    //the only three things the backend needs for this
    const INITIAL_STATE = {
        warehouse_id : 0,
        product_id  : productId,
        amount      : 0,
        typeof      : 'purchase'
    };
    //the data for sending to the server
    const [purchaseData, setPurchaseData] = useState(INITIAL_STATE);
    //the stock that will be displayed on warehouse change
    const [currentStock, setcurrentStock] = useState(0);
    //the price that will display on amount change
    const [price, setPrice] = useState(0);
    //this will show leftover money
    const [ownerMoneyLeft, setOwnerMoneyLeft] = useState(parseFloat(ownerMoney));
    //using some inbuilt bootstrap validation
    const [validated, setValidated] = useState(false);
    //bootstrap has some weird things on the validation and you cant really use custom validations. Since the prod price never changes
    //im just gonna find the max number that doesnt put ownermoney in the negatives
    const maxValue = Math.floor(ownerMoney/productCost);
    //form parts
    const displayWarehouseSelect = data.map(warehouse => {
        let selectName = `${warehouse.warehouse_name} (${warehouse.warehouse_state})`;
        return(
            <option key={warehouse.warehouse_id} value={warehouse.warehouse_id} >{selectName}</option>
        )
    });
    //Next, on user input, update any state variable (this likely wont work for files, i will have to find that out later)
    const handleChange =  (event) =>{
        setPurchaseData({ ...purchaseData, [event.target.name] : event.target.value });
    };
    useEffect(() => {
        if (purchaseData !== INITIAL_STATE)
        {
            if (purchaseData.warehouse_id !== ""){
                let currentWarehouse = data.find(warehouse => warehouse.warehouse_id == purchaseData.warehouse_id);
                setcurrentStock(currentWarehouse.current_stock_level);
            }
            else
            {
                setcurrentStock(0);
            }
            setPrice(parseFloat(purchaseData.amount) * parseFloat(productCost));
            //for some reason doesnt like when you put this directly in the setstate
            let remaining = parseFloat(ownerMoney) - (parseFloat(purchaseData.amount) * parseFloat(productCost))
            setOwnerMoneyLeft(remaining);
        }

    }, [purchaseData])
    // Next, on user submit, we will post to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        //lets do some front end validation
        const form = event.currentTarget;
        if (form.checkValidity() === false ) {
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
                body   : JSON.stringify(purchaseData)
            },{mode:'cors'});
            if(response.status !== 201){
                const message = await response.json();
            }else{
                //handle error here
                const message = await response.json();
                navigate(`/products/${productId}?purchaseSuccess=true`);
                navigate(0);
            }

        }

    }
    return(
        <Form data-bs-theme="dark" onSubmit={handleSubmit}  noValidate validated={validated} >
            <h5 style={{textAlign:'right', color:'green'}}> You currently have ${ownerMoneyLeft} dollars to spend </h5>
            <Form.Group className="mb-3">
            <Form.Label > Select Warehouse to Send To: </Form.Label>
            <Form.Select aria-label="Default select example" name='warehouse_id' required onChange={handleChange} value={purchaseData.warehouse_id}>
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
                        <Form.Control type="number" value={currentStock} disabled readOnly/>
                    </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label> How many do you wish to purchase: </Form.Label>
                    <Col sm="10">
                        <Form.Control required onChange={handleChange} type="number" name='amount' min="1" max={maxValue} value={purchaseData.amount}/>
                    </Col>
                    <Form.Control.Feedback type="invalid">
                        Please choose an amount that does not put you in the negatives.
                    </Form.Control.Feedback>
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label> Total Cost for all these products: </Form.Label>
                    <Col sm="10">
                        <Form.Control  value={price}  disabled readOnly/>
                    </Col>
            </Form.Group>
            <Form.Group className="mb-3">
                    <Form.Label> Total Money Leftover: </Form.Label>
                    <Col sm="10">
                        <Form.Control  value={ownerMoneyLeft} disabled readOnly/>
                    </Col>
            </Form.Group>
            

            
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 0 }}>
                <Button type="submit"> Make a Purchase</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}
export default PurchaseForm;