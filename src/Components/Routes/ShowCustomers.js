//import all dependencies and Hooks
import { useEffect, useState}      from "react";
//Import all homemade components
import GeneralTable                from '../GeneralTable';


function ShowCustomers (){
    const [customerData, setCustomerData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://132.145.219.172:3001/customers', {mode:'cors'});
          const data = await response.json();
          setCustomerData(data);
        }
        catch (e) {
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //components that will load in once data is ready
      const displayTable = customerData && <GeneralTable data={[customerData,'customer_id','customers']}/>
    return(
        <div>
            {displayTable}
        </div>
    );
};
export default ShowCustomers;
