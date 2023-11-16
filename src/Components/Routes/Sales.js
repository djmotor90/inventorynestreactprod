//import all dependencies and Hooks
import { useEffect, useState}      from "react";
//Import all homemade components
import GeneralTable                from '../GeneralTable';


function Sales (){
    const [salesData, setSalesData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/customers/sales', {mode:'cors'});
          const data = await response.json();
          setSalesData(data);
        }
        catch (e) {
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //components that will load in once data is ready
      const displayTable = salesData && <GeneralTable data={[salesData, null,null]}/>
    return(
        <div>
            {displayTable}
        </div>
    );
};
export default Sales;
