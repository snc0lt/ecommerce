import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Grid from '@material-ui/core/Grid';
import Copyright from '../utils/Copyright'
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import CssBaseline from '@material-ui/core/CssBaseline';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';
import { cleanOrder, buyMail } from '../../actions'
import { useDispatch, useSelector } from 'react-redux'


const useStyles = makeStyles((theme) => ({
  listItem: {
    padding: theme.spacing(1, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  appBar: {
    position: 'relative',
  },
  layout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

export default function Review() {
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const user = useSelector(state => state.user)
  var cartTotal = 0;

  cart.map((prodtotal) => (
    cartTotal = cartTotal + (prodtotal.price * prodtotal.order_product.quantity)
  ))

  const updateOrder = (orderId, state) => {
    if (user) {
      try {
        fetch(`http://localhost:3001/orders/detail/${orderId}`, {
          method: 'PUT',
          body: JSON.stringify(state),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } catch (err) { console.log(err) }
    } else if (!user) {
      history.push('/user/login')
    }
  }

  const updateStockProduct = () => {
    cart.forEach(el => {
      var newStock = el.stock - el.order_product.quantity
      const product = {
        stock: newStock,
      };
      try {
        fetch(`http://localhost:3001/products/stock/${el.id}`, {
          method: 'PUT',
          body: JSON.stringify(product),
          headers: {
            'Content-Type': 'application/json'
          }
        })
      } catch (err) { console.log(err) }
    })
  }

  const handleBack = () => {
    history.push('/user/paymentdetails')
  }


  const handleNext = () => {
    const orderId = cart[0].order_product.orderId
    updateOrder(orderId, { state: 'completa' })
    updateStockProduct()
    dispatch(cleanOrder())

    buyMail(
      user.email,
      'Detalle de tu compra',
      cart,
      user
      )
      
    history.push(`/user/orderid/${orderId}`)
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
    </Typography>
          <Stepper activeStep={2} className={classes.stepper}>
            <Step key={1}>
              <StepLabel>{'Direccion de envío'}</StepLabel>
            </Step>
            <Step key={2}>
              <StepLabel>{'Detalles de pago'}</StepLabel>
            </Step>
            <Step key={3}>
              <StepLabel>{'Resumen de compra'}</StepLabel>
            </Step>
          </Stepper>
          <React.Fragment>
            <Typography variant="h6" gutterBottom>
              Resumen de compra
      </Typography>
            <List disablePadding>
              {cart.map((product) => (
                <ListItem className={classes.listItem} key={product.name}>
                  <ListItemText primary={`${product.name} x${product.order_product.quantity}`} />
                  <Typography variant="body2">$ {product.price * product.order_product.quantity}</Typography>
                </ListItem>
              ))}
              <ListItem className={classes.listItem}>
                <ListItemText primary="Total" />
                <Typography variant="subtitle1" className={classes.total}>
                  $ {cartTotal}
                </Typography>
              </ListItem>
            </List>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Envio
          </Typography>
                <Typography gutterBottom>{user.firstName}</Typography>
                <Typography gutterBottom>
                  {user.address}, {user.province} - {user.city} / {user.postalcode}, {user.country}
                </Typography>
              </Grid>
              <Grid item container direction="column" xs={12} sm={6}>
                <Typography variant="h6" gutterBottom className={classes.title}>
                  Detalles del pago
          </Typography>
                <Grid container>
                    <React.Fragment key={user.firstName}>
                      <Grid item xs={6}>
                        <Typography gutterBottom>Tipo:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>Visa</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>Titular:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>{user.firstName}</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>Numero:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>xxxx-xxxx-xxxx-1234</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>Fecha de expiracion:</Typography>
                      </Grid>
                      <Grid item xs={6}>
                        <Typography gutterBottom>04/2024</Typography>
                      </Grid>
                    </React.Fragment>
                </Grid>
              </Grid>
            </Grid>
            <div className={classes.buttons}>
              <Button onClick={handleBack} className={classes.button}>
                Atras
              </Button>
              <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={handleNext}
                className={classes.button}
              >
                Siguiente
                </Button>
            </div>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </>
  );
}