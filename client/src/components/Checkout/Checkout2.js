import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

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


export default function Checkout( ) {
  const history = useHistory()
  const classes = useStyles();
  const user = useSelector( state => state.user)
  const { id } = useParams();
  const handleSubmit = () => {
    history.push(`/user/panel/${user.id}`)
  };

  return (
  <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
      </Typography>
          <Stepper activeStep={3} className={classes.stepper}>
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
                <Typography variant="h5" gutterBottom>
                  Gracias por su compra.
                </Typography>
                <Typography variant="subtitle1">
                  Tu numero de orden es: #{id}. Te hemos enviado un mail con el detalle del pedido, 
                  le notificaremos cuando enviemos su compra.
                </Typography>
                <div>
                <Button
                type='submit'
                variant="contained"
                color="primary"
                onClick={handleSubmit}
                className={classes.button}
              >
                Finalizar
                </Button>
                </div>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </>
  )}