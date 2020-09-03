import React from 'react';
import './App.css';
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/Navbar/NavBar'
import Products from './components/Products/Products'

function App() {
  return (
    <div className="App">
      <Router>
        {/* por los momentos se muestra solo el searchbar pero aqui debe ir un navbar */}
        <NavBar /> 
        <Switch>
          <Route exact path='/products' component={Products} />
          <Route exact path='/products/:id' component={ProductDetails} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;
