import React from 'react';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import CreateProduct from './components/CreateProduct/CreateProduct'
import Dashboard from './components/AdminPanel/Dashboard';
import Catalogo from './components/Catalog/Catalog';
import FormCategory from './components/FormCategory/FormCategory';
import SearchBar from './components/SearchBar/SearchBar';
import { Carrousel } from './components/Carrousel/Carrousel';

function App() {
  return (
    <div className="App">
      <Router>
        <SearchBar />
          <Route exact path='/' render={() => <Carrousel />} />

          <Route exact path='/' component = {Catalogo}  />

          <Route exact path='/products' component={Catalogo} />

          <Route exact path='/products/:id' component={ProductDetails} />

          <Route exact path='/:name' component={Catalogo} />

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

      </Router>
    </div>
  );


}

export default App;
