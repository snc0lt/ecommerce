import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Copyright from '../utils/Copyright'
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import CssBaseline from '@material-ui/core/CssBaseline';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import { useHistory } from 'react-router-dom';

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

export default function PaymentForm() {
  const classes = useStyles();
  const history = useHistory()
  
  const handleBack = () => {
    history.push('/user/addressform')
  }

  const handleSubmit = () => {
    history.push('/user/revieworder')
  }

  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
      </Typography>
          <Stepper activeStep={1} className={classes.stepper}>
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
              Detalles de pago
          </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <TextField required id="cardName" label="Nombre del titular" fullWidth autoComplete="cc-name" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cardNumber"
                  label="Numero de tarjeta"
                  fullWidth
                  autoComplete="cc-number"
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField required id="expDate" label="Fecha de expiracion" fullWidth autoComplete="cc-exp" />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  required
                  id="cvv"
                  label="CVV"
                  helperText="Digitos de seguridad"
                  fullWidth
                  autoComplete="cc-csc"
                />
              </Grid>
              <Grid item xs={12}>
                <FormControlLabel
                  control={<Checkbox color="secondary" name="saveCard" value="yes" />}
                  label="Recordar los datos de la tarjeta"
                />
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
                onClick={handleSubmit}
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