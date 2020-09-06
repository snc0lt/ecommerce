import React from 'react';
import './App.css';
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/Navbar/NavBar'
import Products from './components/Products/Products'
import CreateProduct from './components/CreateProduct/CP'

import Catalogo from './components/Catalog/Catalog'
import FormCategory from './components/FormCategory/FormCategory'


function App() {
  return (
    <div className="App">
      <Router>
        {/* por los momentos se muestra solo el searchbar pero aqui debe ir un navbar */}
        <NavBar />
        <Switch>
          <Route exact path='/products' component={Products} />

          <Route exact path='/products/:id' component={ProductDetails} />

          <Route exact path='/:name?' component={Catalogo} />

          <Route path='/category/:idCategory'
          render={({ match }) => (
            <FormCategory match={match} />
          )} />


          <Route exact path='/admin/createProduct' component={CreateProduct} />

          <Route exact path='/admin/createCategory'
          render={({ match }) => <FormCategory match={match} />}
          />




        </Switch>
      </Router>
    </div>
  );


}

export default App;
