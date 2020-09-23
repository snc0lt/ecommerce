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
import SignUp from './components/SignUp/SignUp2'
import Register from './components/SignUp/Register'
import Container from '@material-ui/core/Container'
import { Cart } from './components/Cart'
import Checkout from './components/Checkout/Checkout'
import Orders from './components/AdminPanel/Orders'
import { useDispatch, useSelector } from "react-redux";
import { setUser, setGuestCart, setUserSign, getUsers } from "./actions";
import UsersList from './components/AdminPanel/UsersList'
import Profile from './components/Userpanel/Profile'
import ResetPass from './components/Userpanel/ResetPass'
import FormResetPass from './components/FormResetPass/FormResetPass'
import ProtectedAdminRoute from './auth/ProtectedAminRoute'
import ProtectedUserRoute from './auth/ProtectedUserRoutes'


function App() {
  const url = useLocation();
  const dispatch = useDispatch()
  const guestCart = JSON.parse(localStorage.getItem('guest_cart'))
  const users = useSelector(state => state.users)

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    const user_sign = JSON.parse(localStorage.getItem('user_sign'));
    // console.log(guestCart)
    if (user) {
      dispatch(setUser(user))
      // dispatch(getUsers())
    }
    if (!user && user_sign) {
      dispatch(setUserSign(user_sign))
      // dispatch(getUsers())
    }
    if (guestCart) {
      dispatch(setGuestCart(guestCart))
      // dispatch(getUsers())
    }
  }, [guestCart])

  useEffect(() => {
    const fetchData = async () => {
      try {
        const user = await fetch('http://localhost:3001/user/admin/email')
        const { usuario } = await user.json()
        if (usuario) {
          console.log('admin user ya esta creado..!')
        } else {
          try {
            const data = await fetch('http://localhost:3001/userAdmin')
          } catch (err) {
            console.log(err)
          }
        }
      } catch (error) {
        console.log(error)
      }
    }
    fetchData()
  }, [])

  const displayNoneCarrousel = url.pathname.includes('/admin')
    ? null
    : url.pathname.includes('/user')
      ? null
      : <Carrousel />


  return (
    <div className="App">
      <SearchBar />
      {displayNoneCarrousel}
      <Switch>
        <Container maxWidth='lg' className='App_container'>
          
          <Route exact path='/' component={Catalogo} />

          <Route exact path='/:name' component={Catalogo} />

          <Route exact path='/category/:idCategory'
            render={({ match }) => (
              <FormCategory match={match} />
            )} />

          <Route exact path='/products/:id' component={ProductDetails} />
          <Route exact path='/products/category/:id' component={Catalogo} />


          <ProtectedAdminRoute exact path='/admin/panel' component={Dashboard} />
          <ProtectedAdminRoute exact path='/admin/createProduct' component={CreateProduct} />
          <ProtectedAdminRoute exact path='/admin/createCategory'
            render={({ match }) => <FormCategory match={match} />}
          />
          <ProtectedAdminRoute exact path='/admin/editCategory' component={Categorias} />
          <ProtectedAdminRoute exact path='/admin/products/edit' component={Catalogo} />
          <ProtectedAdminRoute exact path="/admin/editproduct/:id" component={CreateProduct} />
          <ProtectedAdminRoute exact path='/admin/editCategory/:name'
            render={({ match }) => (
              <EditCategory match={match} />
            )}
          />
          <ProtectedAdminRoute exact path='/admin/orders' component={Orders} />
          <ProtectedAdminRoute exact path='/admin/users' component={UsersList} />

          <Route exact path='/user/login' component={SignUp} />
          <Route exact path='/user/register' component={Register} />
          <Route exact path='/user/cart' component={Cart} />
          <ProtectedUserRoute exact path='/user/checkout' component={Checkout} />
          <ProtectedUserRoute exact path='/cart' component={Cart} />
          <ProtectedUserRoute exact path='/user/panel/:id' component={Dashboard} />
          <ProtectedUserRoute exact path='/user/perfil/:id' component={Profile} />
          <ProtectedUserRoute exact path='/user/miscompras/:id' component={Orders} />
          <ProtectedUserRoute exact path='/user/resetpassword/:id' component={ResetPass} />
          <ProtectedUserRoute exact path='/user/resetpassword/' component={FormResetPass} />
          <ProtectedUserRoute exact path='/user/resetpassword/recordar/:id' component={ResetPass} />

        </Container>
        
      </Switch>

    </div>
  );

}

export default App;
