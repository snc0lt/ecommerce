import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import { cleanOrder } from "../../actions";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import EmptyCart from '../../components/Cart/EmptyCart'
import Copyright from '../utils/Copyright'

const useStyles = makeStyles((theme) => ({
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

const steps = ['Direccion de envío', 'Detalles de pago', 'Resumen de compra'];

function getStepContent(step) {
  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review />;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout() {
  const history = useHistory()
  const dispatch = useDispatch()
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const logged = useSelector( state => state.userLogged)
  const user = useSelector( state => state.user)
  const cart = useSelector(state => state.cart)
  const userDet = useSelector(state => state.userDetails)

  const updateOrder = (orderId, state) => {
		if (userDet) {
			try {
				const data = fetch(`http://localhost:3001/orders/detail/${orderId}`, {
					method: 'PUT',
					body: JSON.stringify(state),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			} catch (err) { console.log(err) }
			// history.push('/')
		} else if (!userDet) {
			history.push('/user/login')
		}
	}

  const handleNext = () => {
    if(activeStep === steps.length - 1 && cart && cart.length > 0 && userDet){
      const orderId = cart[0].order_product.orderId
      updateOrder(orderId, { state: 'completa'})
      dispatch(cleanOrder())
    }
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
    <>{ cart && cart.length > 0 && userDet
      ? <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Gracias por su compra.
                </Typography>
                <Typography variant="subtitle1">
                  Tu numero de orden es: #{cart[0].order_product.orderId}. Te hemos enviado un mail con el detalle del pedido, 
                  le notificaremos cuando enviemos su compra.
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Atras
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleNext()}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Realizar pedido' : 'Siguiente'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </>
    : <EmptyCart />
    }
    </>
  );
}