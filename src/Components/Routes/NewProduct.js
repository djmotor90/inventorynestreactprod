//Import in all required hooks and dependencies
import { useEffect, useState } from "react";
//Import  in all components
import NewForm    from "../NewForm";
//import in all bootstrap components
import Card from 'react-bootstrap/Card';

function NewProduct (){
    const [formInputData, setFormInputData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/products/new', {mode:'cors'});
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
      const displayForm = formInputData  && <NewForm data = {formInputData} path= 'products'/>;
    return(
      <div className="newFormHolder">
          <Card border="info" data-bs-theme="dark" class="newFormHolder">
            <Card.Header><Card.Title style= {{color: '#61dafb'}}>Create a New Product</Card.Title></Card.Header>
            <Card.Body>
                {displayForm}
            </Card.Body>
          </Card>
      </div>
    );
}
export default NewProduct;