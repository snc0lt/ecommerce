import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {setUser} from '../../actions'
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';
import Container from '@material-ui/core/Container';
import CssBaseline from '@material-ui/core/CssBaseline';
import Avatar from '@material-ui/core/Avatar';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Box from '@material-ui/core/Box';
import Copyright from '../utils/Copyright'

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

const Profile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const { id } = useParams()
    const classes = useStyles();
    const [user, Setuser] = useState({
      firstName: '',
      lastName: '',
      email: '',
      address: '',
      phone: ''
    });


    const handleChange = (event) => {
      Setuser({ ...user, [event.target.name]: event.target.value });
    };

   

    useEffect(() => {
        fetch(`http://localhost:3001/user/${id}`)
        .then(res=>res.json())
        .then(data=> {
            Setuser(data);
            dispatch(setUser(data))
        })
    }, [dispatch,id])

    const handleSubmit = async function (e) {
        e.preventDefault()
        const envio = {
            address: user.address,
            phone: user.phone
        }
       try {
            await fetch(`http://localhost:3001/user/${id}`,
            {
            method: 'PATCH',
            body: JSON.stringify(envio),
            headers:{
                'Content-Type': 'application/json'
            },
            credentials: 'include'
            })
            swal("Success","Datos actualizados","success");
            history.push(`/user/panel/${id}`)
        } catch (error) {swal("error", "error al actualizar los datos, intente de nuevo", "error")            
        }
      }

    return (
      user &&
      <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Perfil de Usuario
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                value={user.firstName}
                autoComplete="fname"
                name="firstName"
                required
                fullWidth
                onChange={handleChange}
                label="Nombre"
                id="firstName"
                autoFocus
              />
              {/* {errors.firstName && (<p className={classes.danger}>{errors.firstName}</p>)} */}
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={user.lastName}
                id="lastName"
                label="Apellido"
                name="lastName"
                // autoComplete="lname"
              />
            {/* {errors.lastName && (<p className={classes.danger}>{errors.lastName}</p>)} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                required
                fullWidth
                onChange={handleChange}
                value={user.email}
                id="email"
                label="Correo electronico"
                name="email"
                // autoComplete="lname"
                disabled
              />
            {/* {errors.lastName && (<p className={classes.danger}>{errors.lastName}</p>)} */}
            </Grid>
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                onChange={handleChange}
                value={user.address}
                name="address"
                label="Direccion"
                // type="address"
                id="address"
                // autoComplete="current-password"
              />
            </Grid>
            {/* {errors.password && (<p className={classes.danger}>{errors.password}</p>)} */}
            <Grid item xs={12}>
              <TextField
                variant="outlined"
                // required
                fullWidth
                onChange={handleChange}
                value={user.phone}
                name="phone"
                label="Telefono"
                id="phone"
                type='number'
                // autoComplete="current-password"
              />
            </Grid>
            {/* {confirmPassword !== user.password ? (<p className={classes.danger}>No coinciden las contraseñas</p>) : null} */}
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Guardar cambios
          </Button>
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
    )
}

export default Profile
