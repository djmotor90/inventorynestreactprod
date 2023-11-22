//Import in all needed hooks and dependencies
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
//Import in all CSS and prestyled components
import './App.css';
//Import in our custom components
  //Custom components making the general frame
import Navbar           from './Components/Navbar';
  //Custome components making the routes
import Home                       from './Components/Routes/Home';

import ShowProducts               from './Components/Routes/ShowProducts';
import ShowProduct                from './Components/Routes/ShowProduct';
import NewProduct                 from './Components/Routes/NewProduct';
import EditProduct                from './Components/Routes/EditProduct';
//import SearchProducts                from './Components/Routes/SearchProducts';


import ShowWarehouses             from './Components/Routes/ShowWarehouses';
import ShowWarehouse              from './Components/Routes/ShowWarehouse';
import NewWarehouse               from './Components/Routes/NewWarehouse';
import EditWarehouse              from './Components/Routes/EditWarehouse';
//import SearchWarehouses                from './Components/Routes/SearchProducts';


import ShowCustomers              from './Components/Routes/ShowCustomers';
import ShowCustomer               from './Components/Routes/ShowCustomer';
import NewCustomer                from './Components/Routes/NewCustomer';
import EditCustomer               from './Components/Routes/EditCustomer';
//import SearchCustomers              from './Components/Routes/SearchProducts';
import Sales                      from './Components/Routes/Sales'

import Purchase                   from './Components/Routes/Purchase'; ///this is going to be exactly what is shown as the form secton of any ShowCust, but for cust w/ primary id of 1 nd only that form
import Reporting                  from './Components/Routes/Reporting';
import CustomerReporting          from './Components/Routes/CustomerReporting';
import ProductReporting           from './Components/Routes/ProductReporting';
import WarehouseReporting         from './Components/Routes/WarehouseReporting';



function App() {
    //We need to make a call to the backend to get the owners name
    const [ownerName, setOwnerName] = useState('');
    const makeAPICall = async () => {
        try {
          const response = await fetch('http://localhost:3001/navbar', {mode:'cors'});
          const data = await response.json();
          setOwnerName(`${data.owner_first_name} ${data.owner_last_name}`);
        }
        catch (e) {
          //for now lets just set it as a John Doe  
          console.log(e)
          setOwnerName(`User`);
        }
      }
    useEffect(() => {
        makeAPICall();
      }, []);
    //We could make a variable for color scheme
  return (
    <div className="App">
      <Router>
        <Navbar ownerName={ownerName}/>
        <div style={{paddingTop:'100px'}}>
          <Routes>
            <Route exact path='/' element={<Home ownerName={ownerName} />}/>
            <Route path='/products' element={<ShowProducts/>}/>
            <Route path='/products/new' element={<NewProduct/>}/>
            <Route path='/products/:id' element={<ShowProduct/>}/>
            <Route path='/products/:id/edit' element={<EditProduct/>}/>

            <Route path='/warehouses' element = {<ShowWarehouses/>}/>
            <Route path='/warehouses/new' element = {<NewWarehouse/>}/>
            <Route path='/warehouses/:id' element = {<ShowWarehouse/>}/>
            <Route path='/warehouses/:id/edit' element={<EditWarehouse/>}/>

            <Route path='/customers' element={<ShowCustomers/>}/>
            <Route path='/customers/new' element={<NewCustomer/>}/>
            <Route path='/sales' element={<Sales/>}/>
            <Route path='/customers/:id' element={<ShowCustomer/>}/>
            <Route path='/customer/:id/edit' element={<EditCustomer/>}/>
            <Route path='/customers/:id/buy' element={<Purchase/>}/>

            <Route path='/reporting' element={<Reporting/>}/>
            <Route path='/reporting/customers' element={<CustomerReporting/>}/>
            <Route path='/reporting/products' element={<ProductReporting/>}/>
            <Route path='/reporting/product/:id' element={<ProductReporting/>}/>
            <Route path='/reporting/warehouses' element={<WarehouseReporting/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

