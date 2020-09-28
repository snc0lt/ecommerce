import React, { useState} from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Copyright from '../utils/Copyright'
import { sendMail } from "../../actions";
import swal from 'sweetalert';

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

export default function FormResetPass() {
  const classes = useStyles();
  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    email: '',
});

  const handleChange = (event) => {
    setErrors(validate({ ...values, [event.target.name]: event.target.value }))
    setValues({ ...values, [event.target.name]: event.target.value });
  };

  const resetForm = () => {
    setValues ({
        ...values,
        email: '',
    })
 
  }

  const handleSubmit = async function (e) {
    e.preventDefault()
    const user = await fetch(`http://localhost:3001/user/email`, {
      method: 'POST',
      body: JSON.stringify({ email: values.email }),
      headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
      },
    })
    const { usuario } = await user.json() 
    if (!usuario){swal('Error','Cuenta inexistente','error'); return}  
    if (usuario.isGoogle){swal('Error','mail asociado a Cuenta Google','error'); return}
    sendMail(values.email) 
    swal("Verifica tu correo electronico","Mail enviado","success");   
    resetForm()
    
  }


  function validate(values) {
    let errors = {};
       if (!values.email  || values.email.length === 0) {
      errors.email = 'Email requerido';
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = 'Email invalido';
    }    
    return errors
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>        
        <Typography component="h1" variant="h5">
          Indica tu mail para cambiar contraseña
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          
           
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
                   
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled= {!values.email}
          >
            Resetear contraseña
          </Button>  
             
         
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}