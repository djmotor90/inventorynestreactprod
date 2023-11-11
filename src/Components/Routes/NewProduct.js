//Import in all required hooks and dependencies
import { useEffect, useState } from "react";
//Import  in all components
import NewForm    from "../NewForm";

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
      const displayForm = formInputData  && <NewForm data = {formInputData} path= 'products'/>;
    return(
        <div>
            <p> New Prod</p>
            {displayForm}
        </div>

    );
}
export default NewProduct;