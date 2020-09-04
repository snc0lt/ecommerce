import React from 'react';
import Products from './components/Products/Products'
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/Navbar/NavBar'
import Products from './components/Products/Products'
import CreateProduct from './components/CreateProdcut/CP'


function App() {
  return (
    <div className="App">
      <Router>
        {/* por los momentos se muestra solo el searchbar pero aqui debe ir un navbar */}
        <NavBar /> 
        <Switch>
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/:id' component={ProductDetails} />
          <Route exact path='/dev' component={CreateProduct} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
