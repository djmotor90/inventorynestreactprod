//Import in all needed hooks and dependencies
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom';
//Import in all CSS and prestyled components
import './App.css';
//Import in our custom components
  //Custom components making the general frame
import Navbar           from './Components/Navbar';
  //Custome components making the routes
import Home               from './Components/Routes/Home';
import ShowProducts       from './Components/Routes/ShowProducts';
import ShowProduct        from './Components/Routes/ShowProduct';
import NewProduct         from './Components/Routes/NewProduct';
import ShowWarehouses     from './Components/Routes/ShowWarehouses';
import ShowWarehouse      from './Components/Routes/ShowWarehouse';
import NewWarehouse       from './Components/Routes/NewWarehouse';
import ShowCustomers      from './Components/Routes/ShowCustomer';
import ShowCustomer       from './Components/Routes/ShowCustomers';
import NewCustomer        from './Components/Routes/NewCustomer';
import Purchase           from './Components/Routes/Purchase';
import Reporting          from './Components/Routes/Reporting';
import Transfer           from './Components/Routes/Transfer';
//import InventoryAdd       from './Components/Routes/InventoryAdd'



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
        <div style={{marginTop:'40px'}}>
          <Routes>
            <Route exact path='/' element={<Home ownerName={ownerName} />}/>
            <Route path='/products' element={<ShowProducts/>}/>
            <Route path='/products/new' element={<NewProduct/>}/>
            <Route path='/products/:id' element={<ShowProduct/>}/>
            <Route path='/warehouses' element = {<ShowWarehouses/>}/>
            <Route path='/warehouses/new' element = {<NewWarehouse/>}/>
            <Route path='/warehouses/:id' element = {<ShowWarehouse/>}/>
            <Route path='/warehouses/:id/transfer' element = {<Transfer/>}/>
            <Route path='/customers' element={<ShowCustomers/>}/>
            <Route path='/customers/new' element={<NewCustomer/>}/>
            <Route path='/customers/:id' element={<ShowCustomer/>}/>
            <Route path='/customers/:id/buy' element={<Purchase/>}/>
            <Route path='/reporting' element={<Reporting/>}/>
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;

