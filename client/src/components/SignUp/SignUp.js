import React, { useState } from 'react';
import { useHistory, Link } from "react-router-dom";
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../utils/Copyright'
import { useDispatch, useSelector } from "react-redux";
import { userLogin, addProductCart } from "../../actions";
// import FormControlLabel from '@material-ui/core/FormControlLabel';
// import Checkbox from '@material-ui/core/Checkbox';

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
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function SignIn() {
  const guestCart = useSelector(state => state.guestCart) 
  const guestUser = useSelector(state => state.user) 
  const classes = useStyles();
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const history = useHistory()
  const dispatch = useDispatch()
  const handleSubmit = async (e) => {
    e.preventDefault()
    if(!guestUser){
      try {
        const user = await fetch('http://localhost:3001/user/email', {
          method: 'POST',
          body: JSON.stringify(values.username)
        })
        const userId = user.usuario.id
        guestCart.map(g => dispatch(addProductCart(userId, g.id, g.price)))
        localStorage.removeItem('guest_cart')
			} catch (err) {console.log(err)}
    }
    if(guestCart){
      try {
        guestCart.map(g => dispatch(addProductCart(guestUser.id, g.id, g.price)))
        localStorage.removeItem('guest_cart')
			} catch (err) {console.log(err)}
    }
    dispatch(userLogin(values))
    history.push('/')
    console.log('loggeado exitosamente')
  } 

  const handleChange = (e) => {
    e.preventDefault()
    setValues({
      ...values, [e.target.name]: e.target.value
    })
    console.log(values)
  }
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Iniciar sesión
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
          <TextField
            value={values.username}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Correo electronico"
            name="username"
            autoComplete="email"
            autoFocus
          />
          <TextField
            value={values.password}
            onChange={handleChange}
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Recuerdame"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Ingresar
          </Button>
          <Grid container>
            <Grid item xs>
              <Link to='/user/change_pass' variant="body2">
                ¿Has olvidado la contraseña?
              </Link>
            </Grid>
            <Grid item>
              <Link to='/user/register'>
                Regístrate
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}