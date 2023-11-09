import logo from './logo.svg';
import './App.css';

//make a horiztonal and vertical navbar

function App() {
  return (
    <div className="App">
      <Router>
        <HorizontalNavbar/>
        <VerticalNavbar/>
        <Routes>
          <Route exact path='/' element={<Home />}/>
          <Route path='/products' element={<Products/>}/>
          <Route path='/products/new' element={<NewProduct/>}/>
          <Route path='/products/:id' element={<ShowProduct/>}/>
          <Route path='/warehouses' element = {<Warehouses/>}/>

        </Routes>
      </Router>
    </div>
  );
}

export default App;
