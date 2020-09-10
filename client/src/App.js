import React from 'react';
import Products from './components/Products/Products';
import ProductDetails from './components/Products/ProductDetails';
import { BrowserRouter as Router, Route, Switch, useLocation } from "react-router-dom";
import CreateProduct from './components/CreateProduct/CreateProduct'
import Dashboard from './components/AdminPanel/Dashboard';
import Catalogo from './components/Catalog/Catalog';
import FormCategory from './components/FormCategory/FormCategory';
import SearchBar from './components/SearchBar/SearchBar';
import { Carrousel } from './components/Carrousel/Carrousel';
import EditCategory from './components/FormCategory/FormUpdateDeleteCategory';
// import { Footer } from './Components/Footer/Footer'
import Categorias from './components/Categorias/Categorias';
import SignUp from './components/SignUp/SignUp'
import Register from './components/SignUp/Register'


function App() {
  const url = useLocation();
  const displayNoneCarrousel = url.pathname.includes('/admin') 
  ? null
  : url.pathname.includes('/user') 
  ? null
  : <Carrousel />

  return (
    <div className="App">
        <SearchBar />
        {displayNoneCarrousel}
        {/* <Carrousel /> */}
        <Switch>
          {/* <Route exact path='/' render={() => <Carrousel />} /> */}

          <Route exact path='/' component={Catalogo} />

          {/* <Route exact path='/products' component={Catalogo} /> */}

          <Route exact path='/products/:id' component={ProductDetails} />

          <Route exact path='/:name' component={Catalogo} />

          <Route path='/category/:idCategory'
          render={({ match }) => (
            <FormCategory match={match} />
          )} />

          <Route path='/products/category/:id' component={Catalogo}/>
          

          <Route exact path='/admin/panel' component={Dashboard} />

          <Route exact path='/admin/createProduct' component={CreateProduct} />

          <Route exact path='/admin/createCategory'
          render={({ match }) => <FormCategory match={match} />}
          />

          <Route exact path='/admin/editCategory' component={Categorias}/>

          <Route exact path='/admin/products/edit' component={Catalogo} />

          <Route exact path="/admin/editproduct/:id" component={CreateProduct} />

          <Route exact path='/admin/editCategory/:name'
				                render={({ match }) => (
					                         <EditCategory match={match} />
				                       )}
			     />

          <Route exact path='/user/login' component={SignUp} />

          <Route exact path='/user/register' component={Register} />
        </Switch>
    </div>
  );


}

export default App;
