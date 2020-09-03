import React from 'react';
import './App.css';
//import SearchBar from './components/SearchBar/SearchBar.jsx';
import NavBar from './components/Navbar/NavBar'
import { Route } from 'react-router-dom'
import ProductCard from './components/Products/ProductCard';
//import Products from './components/Products/Products'



function App() {

  //Se debe pasar en las props, una función al componente SearchBar para realizar la busqueda de
  //los productos, esta función la puse para que la recibiera el componente.
  //No cumple con su objetivo, por ahora.
  
  return (
    <div className="App">
      <Route path='/' render={() => (<div>
                                        <NavBar />
                                        <ProductCard/>
                                        </div>)}/>
    </div>
  );
}

export default App;
