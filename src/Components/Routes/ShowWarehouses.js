//import all dependencies and Hooks
import { useEffect, useState } from "react";
import { Link }                from "react-router-dom";
import GeneralTable            from '../GeneralTable'




function ShowWarehouses (){
    const [warehouseData, setWarehouseData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/warehouses', {mode:'cors'});
          const data = await response.json();
          setWarehouseData(data);

        }
        catch (e) {
          console.log(e, 'error')
        }
      }
      useEffect(() => {
        makeAPICall();
      }, []);
      //components that will load in once data is ready
      const displayTable = warehouseData && <GeneralTable data={[warehouseData,'warehouse_id','warehouses']}/>
    return(
        <div>
            {displayTable}
        </div>
    );
};
export default ShowWarehouses
