import React from 'react';
import Products from './components/Products/Products'
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import NavBar from './components/Navbar/NavBar'
import CreateProduct from './components/CreateProduct/CreateProduct'
import Dashboard from './components/AdminPanel/Dashboard'
import Catalogo from './components/Catalog/Catalog'
import FormCategory from './components/FormCategory/FormCategory'
import SearchBar from './components/SearchBar/SearchBar';



function App() {
  return (
    <div className="App">
      <Router>
        {/* por los momentos se muestra solo el searchbar pero aqui debe ir un navbar */}
        {/* <NavBar /> */}
        <SearchBar />
        <Switch>
          <Route exact path='/products' component={Products} />

          <Route exact path='/products/:id' component={ProductDetails} />

          <Route exact path='/:name?' component={Catalogo} />

          <Route path='/category/:idCategory'
          render={({ match }) => (
            <FormCategory match={match} />
          )} />

          <Route exact path='/admin/panel' component={Dashboard} />

          <Route exact path='/admin/createProduct' component={CreateProduct} />

          <Route exact path='/admin/createCategory'
          render={({ match }) => <FormCategory match={match} />}
          />

          <Route exact path='/admin/products/edit' component={Catalogo} />

          <Route exact path="/admin/editproduct/:id" component={CreateProduct} />

        </Switch>
      </Router>
    </div>
  );


}

export default App;
