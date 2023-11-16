//import all dependencies and Hooks
import { useEffect, useState}      from "react";
//Import all homemade components
import GeneralTable                from '../GeneralTable';


function ShowProducts (){
    const [productData, setProductData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/products', {mode:'cors'});
          const data = await response.json();
          setProductData(data);
        }
        catch (e) {
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //components that will load in once data is ready
      const displayTable = productData && <GeneralTable data={[productData,'product_id','products']}/>
    return(
        <div>
            {displayTable}
        </div>
    );
};
export default ShowProducts
