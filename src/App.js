//Import in all needed hooks and dependencies
import { useEffect, useState } from 'react';
import { BrowserRouter as Router, Link, Route, Routes } from 'react-router-dom'

//Import in all CSS and prestyled components
import './App.css';

//Import in our custom components
  //Custom components making the general frame
import HorizontalNavbar from './Components/HorizontalNavbar';
import VerticalNavbar   from './Components/VerticalNavbar';
  //Custome components making the routes
import Home             from './Components/Home'


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
  return (
    <div className="App">
      <Router>
        <HorizontalNavbar ownerName={ownerName} />
        <VerticalNavbar/>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/products' element={<Home/>}/>
          <Route path='/products/new' element={<Home/>}/>
          <Route path='/products/:id' element={<Home/>}/>
          <Route path='/warehouses' element = {<Home/>}/>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
