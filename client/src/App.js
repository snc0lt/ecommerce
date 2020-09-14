import React, { useEffect } from 'react';
import ProductDetails from './components/Products/ProductDetails';
import { Route, Switch, useLocation } from "react-router-dom";
import CreateProduct from './components/CreateProduct/CreateProduct'
import Dashboard from './components/AdminPanel/Dashboard';
import Catalogo from './components/Catalog/Catalog';
import FormCategory from './components/FormCategory/FormCategory';
import SearchBar from './components/SearchBar/SearchBar';
import { Carrousel } from './components/Carrousel/Carrousel';
import EditCategory from './components/FormCategory/FormUpdateDeleteCategory';
import Categorias from './components/Categorias/Categorias';
import SignUp from './components/SignUp/SignUp'
import Register from './components/SignUp/Register'
import Container from '@material-ui/core/Container'
import { Cart } from './components/Cart'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/AdminPanel/Orders'
import { useDispatch } from "react-redux";
import { setUser, setGuestCart, setUserSign } from "./actions";
// import { Footer } from './Components/Footer/Footer'


function App() {
  const url = useLocation();
  const dispatch = useDispatch()
  const guestCart = JSON.parse(localStorage.getItem('guest_cart'))

  useEffect(() => {
    const user = localStorage.getItem('user');
    const user_sign = JSON.parse(localStorage.getItem('user_sign'));
    // console.log(guestCart)
    if (user) {
      dispatch(setUser(user))
    }
    if(!user && user_sign){
      dispatch(setUserSign(user_sign))
    }
    if(guestCart) {
      dispatch(setGuestCart(guestCart))
    }
  }, [guestCart])

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
        <Container maxWidth='lg' >
          {/* <Route exact path='/' render={() => <Carrousel />} /> */}

          <Route exact path='/' component={Catalogo} />

          {/* <Route exact path='/products' component={Catalogo} /> */}

          <Route exact path='/products/:id' component={ProductDetails} />

          <Route exact path='/:name' component={Catalogo} />

          <Route path='/category/:idCategory'
            render={({ match }) => (
              <FormCategory match={match} />
            )} />

          <Route path='/products/category/:id' component={Catalogo} />


          <Route exact path='/admin/panel' component={Dashboard} />

          <Route exact path='/admin/createProduct' component={CreateProduct} />

          <Route exact path='/admin/createCategory'
            render={({ match }) => <FormCategory match={match} />}
          />

          <Route exact path='/admin/editCategory' component={Categorias} />

          <Route exact path='/admin/products/edit' component={Catalogo} />

          <Route exact path="/admin/editproduct/:id" component={CreateProduct} />

          <Route exact path='/admin/editCategory/:name'
            render={({ match }) => (
              <EditCategory match={match} />
            )}
          />


          <Route exact path='/user/login' component={SignUp} />

          <Route exact path='/user/register' component={Register} />
          <Route exact path='/cart' component={Cart} />

          <Route exact path='/user/cart' component={Cart} />
          <Route exact path='/user/checkout' component={Checkout} />
          <Route exact path='/admin/orders' component={Orders} />
        </Container>
      </Switch>

    </div>
  );

}

export default App;
