//Import in all required hooks and dependencies
import { useEffect, useState } from "react";
//Import  in all components
import GeneralForm    from "../GeneralForm";
//import in all bootstrap components
import Card from 'react-bootstrap/Card';

function NewProduct (){
    const [formInputData, setFormInputData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/warehouses/new', {mode:'cors'});
          const data = await response.json();
          setFormInputData(data);
        }
        catch (e) {
          //eventually will have to do something
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //once the data is loaded in display the information
      //in addition to the current form add in if you want to buy new products
      const displayForm = formInputData  && <GeneralForm data = {formInputData} path= 'warehouses' type='new'/>;
    return(
      <div className = 'd-flex justify-content-center'>
          <Card border="info" data-bs-theme="dark" className="newFormHolder">
            <Card.Header><Card.Title style= {{color: '#61dafb'}}>Create a New Warehouse</Card.Title></Card.Header>
            <Card.Body>
                {displayForm}
            </Card.Body>
          </Card>
      </div>
    );
}
export default NewProduct;