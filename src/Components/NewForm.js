//Note: this could probably just be generalized out to form eventually, but fr now this will generate just blank forms
//Import in all required hooks and dependencies
import { useEffect, useState } from "react";
//Import  in all components
import Form   from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Form';

function NewForm ({ data, path }){
    console.log(data);
    //loop through all you cols to get inputs
    const formInputs = Object.keys(data).map(key => {
        const colName = key;
        const required = !data[key][2] ? 'required' : "";
        //find the form type
        switch (data[key][0])
        {
            case "select":
                //helper fxn for select
                const options = data[key][1].map(value => {
                    return (
                        <option value={value}>{value}</option>
                    )
                });
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label> {key}: </Form.Label>
                        <Form.Select id={key} required={required}>
                            {options}
                        </Form.Select>
                    </Form.Group>
                );
            case 'file':
                //rn only ever accept pics
                return(
                    <Form.Group key={key} controlId="formFile" className="mb-3">
                    <Form.Label> Upload a Picture for {key}: </Form.Label>
                         <Form.Control id={key} type="file" required={required} />
                    </Form.Group>
                );
            case 'text':
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}: </Form.Label>
                         <Form.Control id={key} type="text" required={required} />
                    </Form.Group>  
                );
            case 'number':
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}: </Form.Label>
                         <Form.Control id={key} type="number" required={required} />
                    </Form.Group>  
                );
            case 'date':
                return(
                    <Form.Group key={key} className="mb-3">
                    <Form.Label>{key}: </Form.Label>
                         <Form.Control id={key} type="date" required={required} />
                    </Form.Group>  
                );
        };
    });

    return(

        <Form data-bs-theme="dark">
            {formInputs}
            <Button variant="primary" type="submit" onClick={}>
                Create a New Entry
            </Button>
        </Form>
    );
}
export default NewForm;