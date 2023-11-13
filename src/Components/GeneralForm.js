//THE FUNCTION OF THIS COMPONENT: IT CREATES ANY FORM THAT IS USED TO EDIT OR ADD AN ENTRY FROM ANY TABLE

//Import in all required hooks and dependencies
import { useState }               from "react";
import { useNavigate, useParams } from "react-router-dom"; 
//Import  in all components
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col    from 'react-bootstrap/Col';
import Row    from 'react-bootstrap/Row';

function NewForm ({ data, path, type }){
    console.log(data);
    //make an initial state for every key in your data object 
    const INITIAL_STATE = {};
    //If its supposed to be an edit form, you also want to populate the current value
    if (type === 'edit'){
        Object.keys(data).map(key => {
            return INITIAL_STATE[key] = data[key][3];
        });
    }else{
        Object.keys(data).map(key => {
            return INITIAL_STATE[key] = '';
        });
    }
    //intitialize navigate for redirect
    const navigate = useNavigate();
    //initialize state varaibles
    const [postData, setPostData] = useState(INITIAL_STATE);
    //using some inbuilt bootstrap validation
    const [validated, setValidated] = useState(false);
    //Next, on user input, update any state variable (this likely wont work for files, i will have to find that out later)
    const handleChange = (event) =>{
        console.log(event.target.name);
        setPostData({ ...postData, [event.target.name] : event.target.value });
        console.log(postData)
    };
    // Next, on user submit, we will post to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        const form = event.currentTarget;
        //lets do some front end validation
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
            setValidated(true);
        }
        else{
            setValidated(true);
            const url =''
            if (type === 'new'){
                url = (`http://localhost:3001/${path}`);
            }else{
                const { id } = useParams();
                url = (`http://localhost:3001/${path}/${id}/edit`);
            };
            console.log(url)
            const response = await fetch(url, {
                method : 'POST',
                headers: {
                    'accept'       : 'application/json',
                    'content-type' : 'application/json'
                },
                body   : JSON.stringify(postData)
            },{mode:'cors'});
            if(response.status !== 201){
                //handle error here
                console.log('error')
                const message = await response.json();
            }
            else{
                console.log(response);
                //TODO this will have to send over the id
                const message = await response.json();
                console.log(message)
                const id = message.id;
                navigate(`/${path}/${id}?addSuccess=true`);
            }
        }
    }
    //FORM RENDERING 
    //loop through all you cols to get inputs
    const formInputs = Object.keys(data).map(key => {
        const required = !data[key][2] ? 'required' : "";
        //find the form type
        switch (data[key][0])
        {
            case "select":
                //helper function to loop through all options
                const options = data[key][1].map((value,i) => {
                    return (
                        <option key={i} value={value} >{value}</option>
                    )
                });
                return(
                    <Form.Group key={key} as={Row} className="mb-3">
                    <Form.Label > {key}: </Form.Label>
                    <Col sm="10">
                        <Form.Select name={key} required={required} onChange={handleChange} value={postData[key]}>
                            <option key='default' value={''} > Select a {key} </option>
                            {options}
                        </Form.Select>
                    </Col>
                    </Form.Group>
                );
            case 'file':
                //rn only ever accept pics
                return(
                    <Form.Group key={key} as={Row} controlId="formFile" className="mb-3">
                        <Form.Label> Upload a Picture for {key}: </Form.Label>
                        <Col sm="10">
                            <Form.Control name={key} value={postData[key]} type="file" required={required} onChange={handleChange} placeholder="filename" />
                        </Col>
                    </Form.Group>
                );
            case 'text':
                return(
                    <Form.Group key={key} as={Row} className="mb-3">
                    <Form.Label> {key}: </Form.Label>
                    <Col sm="10">
                        <Form.Control name={key} value={postData[key]} type="text" required={required} onChange={handleChange} placeholder="value"/>
                    </Col>
                    </Form.Group>
                );
            case 'textarea':
                return(
                    <Form.Group key={key} as={Row} className="mb-3">
                    <Form.Label> {key}: </Form.Label>
                    <Col sm="10">
                        <Form.Control name={key} value={postData[key]} type="textarea" as="textarea" required={required} onChange={handleChange} placeholder="value"/>
                    </Col>
                    </Form.Group>
                );
            case 'number':
                return(
                    <Form.Group key={key} as={Row}  className="mb-3">
                    <Form.Label> {key}: </Form.Label>
                    <Col sm="10">
                        <Form.Control name={key} value={postData[key]} type="number" required={required} onChange={handleChange} placeholder="number" />
                    </Col>
                    </Form.Group>
                );
            case 'date':
                return(
                    <Form.Group key={key} as={Row} className="mb-3">
                    <Form.Label> {key}: </Form.Label>
                    <Col sm="10">
                        <Form.Control name={key} value={postData[key]} type="date" required={required} onChange={handleChange} placeholder="date" />
                    </Col>
                    </Form.Group>
                );
        };
    });
    //Making the button display the relevant cue
    const displayButton = type=='new' ?  <Button type="submit"> Add a New Entry </Button> : <Button type="submit"> Submit Edited Entry </Button> ;
    return(
        <Form data-bs-theme="dark" onSubmit={handleSubmit}>
            {formInputs}
            <Form.Group as={Row} className="mb-3">
                <Col sm={{ span: 10, offset: 0 }}>
                    {displayButton}
                </Col>
            </Form.Group>
        </Form>
    );
}
export default NewForm;