//Note: this could probably just be generalized out to form eventually, but fr now this will generate just blank forms
//Import in all required hooks and dependencies
import { useState }                          from "react";
import { useNavigate, useParams}             from "react-router";
//Import  in all components
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col    from 'react-bootstrap/Col';
import Row    from 'react-bootstrap/Row';

function DeliveryForm ({ productData }){
    //set up navigation for success naivgation
    const navigate = useNavigate();
    const { id } = useParams();
    //make this an array of objects to handle adding in new inputs
    const [formFields, setFormFields] = useState([
        {product_id:'', stock:0,  amount: 0}
    ])
    //using inbuilt bootstrap validation
    const [validated,setValidated] = useState(false);
    //make your product selects
    // Next, on user submit, we will post to the database
    const handleSubmit = async (event) => {
      console.log(formFields);
      event.preventDefault();
        //doing some front end validation
        const form = event.currentTarget;
        //none of my product_id's can be '' and amount < stock
        let allProduct_Ids = [];
        let myCustomValidator = true;
        formFields.forEach(input => {
            if(input.product_id === '' || input.amount > input.stock || allProduct_Ids.includes(input.product_id)){
                myCustomValidator = false;
            }
            allProduct_Ids.push(input.product_id);
        });
        if (form.checkValidity() === false || !myCustomValidator ) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }else{
            setValidated(true);
            const url = (`http://localhost:3001/customers/${id}`);
            const response = await fetch(url, {
                method : 'POST',
                headers: {
                    'accept'       : 'application/json',
                    'content-type' : 'application/json'
                },
                body   : JSON.stringify(formFields)
            },{mode:'cors'});
            if(response.status !== 201){

                const message = await response.json();
                
            }
            else{
                //handle error here
                const message = await response.json();
                navigate(`/customers/${id}?purchaseSuccess=true`);
                navigate(0);
            }

        }

    
    };
    const handleFormChange = (event,index) => {
        let data = [...formFields];
        data[index][event.target.name] = event.target.value;
        setFormFields(data);
        //modify all the amounts available
        formFields.forEach(formInput => {
            if (formInput.product_id !== ''){
                //go look it up in your product data array
                formInput.stock = productData[formInput.product_id][1];
            }
        })
    };
    const handleAddFields = () => {
        //only add if you havent hit the max number of products we have inventory for
        if (formFields.length < Object.keys(productData).length){
            let newFormInputObj = {product_id:'',stock:0,amount:0};
            //add this to your state variable
            setFormFields([...formFields, newFormInputObj]);
        }
        //TODO give a message that theyve exceeded amount available
    };
    const handleRemoveFields = (index) => {
        let data = [...formFields];
        data.splice(index,1);
        setFormFields(data);
    }; 
    return(
        <Form data-bs-theme="dark" onSubmit={handleSubmit}  noValidate validated={validated} style={{padding:'40px'}} >
            {formFields.map((form, index) => {
                return(
                    <div key={index}>
                        <Form.Group as={Row} className="mb-3">
                            <Form.Label > Product {index + 1}: </Form.Label>
                            <Form.Select aria-label="Default select example" 
                                name='product_id' 
                                required 
                                onChange={event => handleFormChange(event,index)} 
                                value={form.product_id}
                            >
                                <option name='product_id' value=""> Select a Product </option>
                                { Object.keys(productData).map(product_id => {
                                    return(<option key={product_id} value={product_id} >{productData[product_id][0]}</option>)})
                                }
                            </Form.Select>
                        </Form.Group>
                        <Form.Group as={Row} className="mb-3" style = {{padding:'0px 100px'}}>
                            <Form.Label> Amount in stock: </Form.Label>
                            <Col sm="10">
                            <Form.Control type="number" value={form.stock} disabled readOnly/>
                                </Col>
                        </Form.Group>
                        <Form.Group className="mb-3" style = {{padding:'0px 100px'}}>
                            <Form.Label> How many do you wish to purchase: </Form.Label>
                            <Col sm="10">
                                <Form.Control 
                                    required 
                                    onChange={event => handleFormChange(event,index)} 
                                    type="number"
                                    name='amount' 
                                    min="1" 
                                    max = {form.stock}
                                    value={form.amount}
                                />
                            </Col>
                        </Form.Group>
                        <Button variant="danger" onClick={() => handleRemoveFields(index)} style={{float:'right', padding:'5px', margin:'-50px 0px'}}> Delete Product {index + 1}</Button>
                    </div>


                )
            })}
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 0 }}>
                <Button variant="secondary" onClick={handleAddFields}> Add a New Product</Button>
                </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 0 }}>
                <Button type="submit"> Simulate a Customer Purchase</Button>
                </Col>
            </Form.Group>
        </Form>
    );
}
export default DeliveryForm;