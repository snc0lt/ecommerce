import React, { useState, useEffect } from 'react';
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
import { userLogin, addProductCart, cleanGuestOrder, addUser } from "../../actions";
import swal from 'sweetalert';
import GoogleLogin from 'react-google-login'
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
  const gCount = useSelector(state => state.guestCount)
  // const userDet = useSelector(state => state.userDetails)
  const classes = useStyles();
  
  const [values, setValues] = useState({
    username: '',
    password: '',
  });

  const history = useHistory()
  const dispatch = useDispatch()



  const responseGoogle = async (response) => { 
  
    // const { email, familyName, givenName, googleId } = response.profileObj
    // const gmail = {
    //   firstName: givenName, //obtenemos el nombre de las respuesta
    //   lastName: familyName, //obtenemos el apellido de las respuesta
    //   email: email, //obtenemos el email de las respuesta
    //   password: googleId, //seteamos una password
    // }
    // const logueo = {
    //   username: email,
    //   password: googleId,
    // }
    // try {
    // const user = await fetch(`http://localhost:3001/user/email`, {
    //       method: 'POST',
    //       body: JSON.stringify({ email: email }),
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //     })

    // const { usuario } = await user.json()

    // if (usuario && !usuario.active) {
    // swal('Error', 'Cuenta bloqueada, contactese con el administrador', 'error')
    //   return
    // }

    // let pId;
    //     const storage = JSON.parse(localStorage.getItem('guest_cart'))
    //       storage.map( s => dispatch(addProductCart(userId, s.id, s.price)))
    //     guestCart.map(s => {
    //       pId = s.id
    //       dispatch(addProductCart(usuario.id, s.id, s.price))
    //     })

    //       // guestCart.map(g => dispatch(addProductCart(userId, g.id, g.price)))
    //     localStorage.removeItem('guest_cart')
    //     dispatch(cleanGuestOrder())
    //     dispatch(userLogin(logueo, history))
    //     console.log('loggeado exitosamente 1')
    //   } catch (err) { console.log(err) }
    
    // if (guestCart && guestUser) {
    //   console.log('entre al segundo if')
    //   try {
    //     guestCart.map(g => dispatch(addProductCart(guestUser.id, g.id, g.price)))
    //     localStorage.removeItem('guest_cart')
    //     dispatch(cleanGuestOrder())
    //     dispatch(userLogin(logueo, history))
    //     console.log('loggeado exitosamente 2')
    //   } catch (err) { console.log(err) }
    // }
    // console.log('no entre a ninguno')
    // dispatch(cleanGuestOrder())
    // dispatch(userLogin(values, history))
    // // history.push('/')
    // localStorage.removeItem('guest_cart')
    // console.log('loggeado exitosamente 3')
    // if (!guestUser && guestCart) {
    //   try {
        
    //     let pId;
    //     const storage = JSON.parse(localStorage.getItem('guest_cart'))
    //     //   storage.map( s => dispatch(addProductCart(userId, s.id, s.price)))
    //     storage.map(s => dispatch(addProductCart(usuario.id, s.id, s.price)))
        
    //     //   // guestCart.map(g => dispatch(addProductCart(userId, g.id, g.price)))
    //     localStorage.removeItem('guest_cart')
    
      // dispatch(userLogin(logueo, history))
    
    //     dispatch(cleanGuestOrder())
    //     console.log('loggeado exitosamente 1')
    //   } catch (err) { console.log(err) }
    // }
        
    // if (!usuario) {dispatch(addUser(gmail))}

    // if (guestCart && guestUser) {
    //   try {
    //     guestCart.map(g => dispatch(addProductCart(guestUser.id, g.id, g.price)))
    //     localStorage.removeItem('guest_cart')
    //     dispatch(cleanGuestOrder())
    //     dispatch(userLogin(logueo, history))
    //     console.log('loggeado exitosamente 2')
    //   } catch (err) { console.log(err) }
    // }
    // dispatch(cleanGuestOrder())
    // dispatch(userLogin(logueo, history))
    // // history.push('/')
    // localStorage.removeItem('guest_cart')
    // console.log('loggeado exitosamente 3')  
    // ;
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!guestUser && guestCart) {
      console.log('entre al primer if')
      try {
        const user = await fetch('http://localhost:3001/user/email', {
          method: 'POST',
          body: JSON.stringify({ email: values.username }),
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
        })
        const { usuario } = await user.json()
        if (!usuario.active) {
          swal('Error', 'Cuenta bloqueada, contactese con el administrador', 'error')
          return
        }
        let pId;
        // const storage = JSON.parse(localStorage.getItem('guest_cart'))
        //   storage.map( s => dispatch(addProductCart(userId, s.id, s.price)))
        guestCart.map(s => {
          pId = s.id
          dispatch(addProductCart(usuario.id, s.id, s.price))
        })

        //   // guestCart.map(g => dispatch(addProductCart(userId, g.id, g.price)))
        localStorage.removeItem('guest_cart')
        dispatch(cleanGuestOrder())
        dispatch(userLogin(values, history))
        console.log('loggeado exitosamente 1')
      } catch (err) { console.log(err) }
    }
    if (guestCart && guestUser) {
      console.log('entre al segundo if')
      try {
        guestCart.map(g => dispatch(addProductCart(guestUser.id, g.id, g.price)))
        localStorage.removeItem('guest_cart')
        dispatch(cleanGuestOrder())
        dispatch(userLogin(values, history))
        console.log('loggeado exitosamente 2')
      } catch (err) { console.log(err) }
    }
    // console.log('no entre a ninguno')
    // dispatch(cleanGuestOrder())
    // dispatch(userLogin(values, history))
    // // history.push('/')
    // localStorage.removeItem('guest_cart')
    // console.log('loggeado exitosamente 3')
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
              <Link to='/user/resetpassword/' variant="body2">
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
        <br/>
        <div className='contenedor-google'>
                <GoogleLogin
                className='boton-google'
                // clientId= {"870686065038-pbngahqtonie7p6oefqt2vulmtnh4hfn.apps.googleusercontent.com"}//"290048590933-08oj5or91lu4hpkbnbjs1d0gl6tcied5.apps.googleusercontent.com"}
                buttonText='Ingresar con Google'
                onSuccess={responseGoogle}
                // onFailure={responseGoogle}
                isSignedIn={false}                            
                cookiePolicy={'single_host_origin'}/>
            </div>
      </div>
      <Box mt={8}>
        <Copyright />
      </Box>
    </Container>
  );
}