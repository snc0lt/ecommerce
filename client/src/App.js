import React from 'react';
import './App.css';
import SearchBar from './components/SearchBar/SearchBar.jsx';
import Products from './components/Products/Products'
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";



function App() {

  //Se debe pasar en las props, una función al componente SearchBar para realizar la busqueda de
  //los productos, esta función la puse para que la recibiera el componente.
  //No cumple con su objetivo, por ahora.
  // const searchAll = function(searchField){
  //   console.log("busqueda con el término: ",searchField);
  // }
  return (
    <div className="App">
      <Router>
        {/* por los momentos se muestra solo el searchbar pero aqui debe ir un navbar */}
        <SearchBar /> 
        <Switch>
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/:id' component={ProductDetails} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
