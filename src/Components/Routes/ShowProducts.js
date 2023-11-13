//import all dependencies and Hooks
import { useEffect, useState}      from "react";
import { Link, useSearchParams  }  from "react-router-dom";
//Import all homemade components
import GeneralTable                from '../GeneralTable';
//Import all bootstrap components
import Toast    from 'react-bootstrap/Toast';
import NotifToast from "../NotifToast";

function ShowProducts (){
    //On success of an add, you will be redirected here and create a success toast notification
    const [searchParams, setSearchParams] = useSearchParams();
    const [show, setShow] = useState(false);
    let successText = ''
    const handleAddSuccess = () => {
       if (searchParams.get('success')){
          setShow(true);
       }
    };
    const [productData, setProductData] = useState(null);
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/products', {mode:'cors'});
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
        handleAddSuccess();
      }, []);
      //components that will load in once data is ready
      const displayTable = productData && <GeneralTable data={[productData,'product_id','products']}/>
    return(
        <div>
            <Toast onClose={() => setShow(false)} data-bs-theme="dark" show={show} delay={3000} autohide style = {{position:'absolute', right: '0'}}>
              <Toast.Header>
                <img
                  src="holder.js/20x20?text=%20"
                  className="rounded me-2"
                  alt=""
                />
                <strong className="me-auto">Inventory Nest</strong>
                <small>Just Now</small>
              </Toast.Header>
              <Toast.Body> You have successfully added a new Product to the Database.</Toast.Body>
            </Toast>
            {displayTable}
        </div>
    );
};
export default ShowProducts
