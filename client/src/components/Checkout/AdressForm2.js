import React, { useState, useEffect } from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import { useSelector, useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Copyright from '../utils/Copyright'
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import { getUserDetail } from '../../actions';

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

export default function AddressForm() {
  const classes = useStyles();
  const userId = useSelector(state => state.userDetails)
  const dispatch = useDispatch()
  const history = useHistory()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    province: '',
    postalcode: '',
    country: '',
  })

  useEffect(() => {
    fetch(`http://localhost:3001/user/${userId.id}`)
      .then(res => res.json())
      .then(data => {
        setUser(data);
      })
  }, [userId.id])

  const handleChange = (event) => {
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async function (e) {
    e.preventDefault()
    const envio = {
      firstName: user.firstName,
      lastName: user.lastName,
      address: user.address,
      city: user.city,
      province: user.province,
      postalcode: user.postalcode,
      country: user.country,
    }
    try {
      await fetch(`http://localhost:3001/user/${userId.id}`,
        {
          method: 'PATCH',
          body: JSON.stringify(envio),
          headers: {
            'Content-Type': 'application/json'
          },
          credentials: 'include'
        })
        dispatch(getUserDetail(userId.id))
      history.push(`/user/paymentdetails`)
    } catch (error) {
      swal("Ha ocurrido un error", "error")
    }
  }
  return (
    <>
      <CssBaseline />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
        </Typography>
          <Stepper activeStep={0} className={classes.stepper}>
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
              Datos de Envio
            </Typography>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="firstName"
                    name="firstName"
                    label="Nombre"
                    fullWidth
                    autoComplete="given-name"
                    value={user.firstName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="lastName"
                    name="lastName"
                    label="Apellido"
                    fullWidth
                    autoComplete="family-name"
                    value={user.lastName}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    id="address"
                    name="address"
                    label="Direccion"
                    fullWidth
                    autoComplete="shipping address-line1"
                    value={user.address}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="city"
                    name="city"
                    label="Ciudad"
                    fullWidth
                    autoComplete="shipping address-level2"
                    value={user.city}
                    onChange={handleChange}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    id="province"
                    name="province"
                    label="Estado/Provincia/Region"
                    fullWidth
                    onChange={handleChange}
                    value={user.province}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="postalcode"
                    name="postalcode"
                    label="Codigo postal"
                    fullWidth
                    autoComplete="shipping postal-code"
                    onChange={handleChange}
                    value={user.postalcode}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    id="country"
                    name="country"
                    label="Pais"
                    fullWidth
                    autoComplete="shipping country"
                    onChange={handleChange}
                    value={user.country}
                  />
                </Grid>
                
              </Grid>
              <div className={classes.buttons}>
                <Button
                  type='submit'
                  variant="contained"
                  color="primary"
                  className={classes.button}
                >
                  Siguiente
                </Button>
              </div>
            </form>
          </React.Fragment>
        </Paper>
        <Copyright />
      </main>
    </>
  );
}