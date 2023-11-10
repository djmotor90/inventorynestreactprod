//Import in all needed hooks and dependencies
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
  return (
    <div className="App">
      <Router>
        <HorizontalNavbar/>
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
