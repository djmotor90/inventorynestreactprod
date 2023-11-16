//Import in all required hooks and dependencies
import { useEffect, useState }       from "react";
import { useNavigate,useParams }     from "react-router-dom";
//Import  in all components
import GeneralForm    from "../GeneralForm";
//import in all bootstrap components
import Card      from 'react-bootstrap/Card';
import Button    from 'react-bootstrap/Button';

function EditWarehouse (){
    //intialize all react router information
    const { id } = useParams();
    const navigate = useNavigate();
    //make a request for the information to be sent over to the general form
    const [formInputData, setFormInputData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch(`http://localhost:3001/warehouses/${id}/edit`, {mode:'cors'});
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
      //Make a handler for returning back to the product
      const handleReturnClick = () =>{
        navigate(`/warehouses/${id}`);
      };
      //once the data is loaded in display the information
      //in addition to the current form add in if you want to buy new products
      const displayForm = formInputData  && <GeneralForm data = {formInputData} path= 'warehouses' type='edit'/>;
    return(
      <div className="newFormHolder">
          <Card border="info" data-bs-theme="dark" className="newFormHolder">
            <Card.Header><Card.Title style= {{color: '#61dafb'}}> Edit Your Warehouse's Information </Card.Title></Card.Header>
            <Card.Body>
                {displayForm}
                <Button variant="primary" onClick={() => handleReturnClick()}>Return to General Warehouse Information</Button>
            </Card.Body>
          </Card>
      </div>
    );
}
export default EditWarehouse;