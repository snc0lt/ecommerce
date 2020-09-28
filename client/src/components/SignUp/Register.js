import React, {useState} from 'react';
import { useHistory } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import { Link } from "react-router-dom";
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../utils/Copyright'
import { useDispatch } from "react-redux";
import { addUser } from "../../actions";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  danger: {
    color: 'red'
  }
}));

export default function SignUp() {
  const history = useHistory()
  const classes = useStyles();
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  });

  const [confirmPassword, setconfirmPassword] = useState('')
  
  const dispatch = useDispatch()

  const handleChange = (event) => {
    setErrors(validate({ ...values, [event.target.name]: event.target.value }))
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setValues ({
        ...values,
        firstName: '',
        lastName: '',
        email: '',
        password: ''
    })
    setconfirmPassword('')
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    dispatch(addUser(values))
    resetForm()
    history.push('/user/login')
  }

  function validate(values) {
    let errors = {};
    if (!values.firstName  || values.firstName.length === 0) {
      errors.firstName = 'El nombre es requerido';
    }

    if (!values.lastName || values.lastName.length === 0) {
      errors.lastName = 'El apellido es requerido';
    }

    if (!values.email  || values.email.length === 0) {
      errors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email invalido';
    }
    
    if (!values.password  || values.password.length === 0) {
      errors.password = 'Contraseña requerida';
    } else if (!/(?=.*[0-9])/.test(values.password)) {
      errors.password = 'Contraseña invalida';
    } else if(values.password.length < 8){
      errors.password = 'La contraseña debe tener 8 o más caracteres'
    }
    return errors
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Regístrate
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                autoComplete="fname"
                name="firstName"
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={values.firstName}
                id="firstName"
                label="Nombre"
                autoFocus
              />
              {errors.firstName && (<p className={classes.danger}>{errors.firstName}</p>)}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={values.lastName}
                id="lastName"
                label="Apellido"
                name="lastName"
                autoComplete="lname"
              />
            {errors.lastName && (<p className={classes.danger}>{errors.lastName}</p>)}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={values.email}
                id="email"
                label="Correo electronico"
                name="email"
                autoComplete="email"
                type="email"
              />
            </Grid>
            {errors.email && (<p className={classes.danger}>{errors.email}</p>)}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={values.password}
                name="password"
                label="Contraseña"
                type="password"
                id="password"
                autoComplete="current-password"
              />
            </Grid>
            {errors.password && (<p className={classes.danger}>{errors.password}</p>)}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={(e) => setconfirmPassword(e.target.value)}
                value={confirmPassword}
                name="confirmPassword"
                label="Confirmar Contraseña"
                type="password"
                id="confirmPassword"
                autoComplete="current-password"
              />
            </Grid>
            {confirmPassword !== values.password ? (<p className={classes.danger}>No coinciden las contraseñas</p>) : null}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Registrarse
          </Button>
          <Grid container justify="flex-end">
            <Grid item>
              <Link to="/user/login" >
                ¿Ya tenes una cuenta? Inicia sesión
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}