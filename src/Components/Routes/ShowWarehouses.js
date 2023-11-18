//import all dependencies and Hooks
import { useEffect, useState}      from "react";
import { Link, useSearchParams  }  from "react-router-dom";
//Import all homemade components
import GeneralTable                from '../GeneralTable';


function ShowWarehouses (){
    const [productData, setProductData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/warehouses', {mode:'cors'});
          const data = await response.json();
          setProductData(data);
          console.log(data)
        }
        catch (e) {
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //components that will load in once data is ready
      const displayTable = productData && <GeneralTable data={[productData,'warehouse_id','warehouses']}/>
    return(
        <div>
            {displayTable}
        </div>
    );
};
export default ShowWarehouses;

