//Note: this could probably just be generalized out to form eventually, but fr now this will generate just blank forms
//Import in all required hooks and dependencies
import { useState }    from "react";
import { useNavigate } from "react-router-dom"; 
//Import  in all components
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

function NewForm ({ data, path, values }){
    //make an initial state for every key in your data object and set them to empty
    //TODO this isnt working as a state variable
    const INITIAL_STATE = {

    };
    Object.keys(data).map(key => {
        if (data[key][0] == 'select')
        {
            console.log(data[key][1][0])
            return INITIAL_STATE[key] = data[key][1][0];
        }
        else
        {
            return INITIAL_STATE[key] = '';
        }
        
    });
    
    const navigate = useNavigate();
    const [postData, setPostData] = useState(INITIAL_STATE);
    //Next, on user input, update any state variable (this likely wont work for files, i will have to find that out later)
    const handleChange = (event) =>{
        console.log(event.target.name);
        setPostData({ ...postData, [event.target.name] : event.target.value });
      
        console.log(postData)
    };
    // Next, on user submit, we will post to the database
    const handleSubmit = async (event) => {
        event.preventDefault();
        //harcoding the localhost URL for now, ideally should be in a .env but cloning from github got confusing for them when it was there
        const url = (`http://localhost:3001/${path}`)
        console.log(url)
        const response = await fetch(url, {
            method : 'POST',
            headers: {
                'accept'       : 'application/json',
                'content-type' : 'application/json'
            },
            body   : JSON.stringify(postData)
        },{mode:'cors'});
        if(response.status !== 201)
        {
            //handle error here
        }
        else
        {
            console.log(response);
            const message = await response.json();
            console.log(message)
            navigate(`/${path}/?success=${message.message}`);
        }
    }
    //loop through all you cols to get inputs
    const formInputs = Object.keys(data).map(key => {
        const colName = key;
        const required = !data[key][2] ? 'required' : "";
        //find the form type
        switch (data[key][0])
        {
            case "select":
                //helper fxn for select
                //in case they never touch it set the state variable at the very beginning because apparently it wont
                //INITIAL_STATE[key] = data[key][0];
                const options = data[key][1].map((value,i) => {
                    return (
                        <option key={i} value={value} >{value}</option>
                    )
                });
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label> {key}: </Form.Label>
                        <Form.Select name={key} required={required} onChange={handleChange} value={postData[key]}>
                            {options}
                        </Form.Select>
                    </Form.Group>
                );
            case 'file':
                //rn only ever accept pics
                return(
                    <Form.Group key={key} controlId="formFile" className="mb-3">
                    <Form.Label> Upload a Picture for {key}: </Form.Label>
                         <Form.Control name={key} value={postData[key]} type="file" required={required} onChange={handleChange} />
                    </Form.Group>
                );
            case 'text':
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}: </Form.Label>
                         <Form.Control name={key} value={postData[key]} type="text" required={required} onChange={handleChange} />
                    </Form.Group>  
                );
            case 'number':
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}: </Form.Label>
                         <Form.Control name={key} value={postData[key]} type="number" required={required} onChange={handleChange} />
                    </Form.Group>  
                );
            case 'date':
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}: </Form.Label>
                         <Form.Control name={key} value={postData[key]} type="date" required={required} onChange={handleChange} />
                    </Form.Group>  
                );
        };
    });

    return(
        <Form data-bs-theme="dark" onSubmit={handleSubmit}>
            {formInputs}
            <Button variant="primary" type="submit">
                Create a New Entry
            </Button>
        </Form>
    );
}
export default NewForm;