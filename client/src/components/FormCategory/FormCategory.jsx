import React, {useState,useEffect} from 'react';
import "../StyleForm.css"
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../UploadImageButton/styleButtonUpload.css'
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import Select from '@material-ui/core/Select';
import UploadImgButton from '../UploadImageButton/UploadImageButton'
import NativeSelect from '@material-ui/core/NativeSelect'
import { Input } from '@material-ui/core';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Copyright from '../utils/Copyright.js'

const useStyles = makeStyles((theme) => ({
    paper: {
      marginTop: theme.spacing(8),
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '200%', // Fix IE 11 issue.
      marginTop: theme.spacing(3),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));

export default function FormCategory({ match }){
    const classes = useStyles();

    const [input, setInput] = useState({
        name: '',
        description: ''
    });

    const handleInputChange = (e)=>{
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
    };
    const resetForm = ()=> {
        setInput({
            name: '',
            description: ''
        })
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const newCategory = { name: input.name, description: input.description}
        fetch('http://localhost:3001/category', {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        .then(()=>{
            alert(`Se ha creado una nueva Categoria exitosamente`)
            resetForm();
        })
        .catch((err)=>{
             console.log(err)
        })
    }

    return(

    <Container component="main" maxWidth="xs">
    <CssBaseline />
    <div className={classes.paper}>
    <Typography component="h1" variant="h5">
        NUEVA CATEGORIA
    </Typography>
    <form className={classes.form} noValidate onSubmit={handleSubmit} >
        <Grid container spacing={2}>
        <Grid item xs={12}>
            <TextField
            autoComplete="fname"
            name="name"
            variant="outlined"
            required
            fullWidth
            onChange={handleInputChange}
            //   value={input.name}
            // id="firstName"
            label="Nombre de la categoria"
            autoFocus
            />
        </Grid>
        <Grid item xs={12} >
        </Grid>
        <Grid item xs={12}>
            <TextField className='styleDescripcion'
            fullWidth
            id="outlined-textarea"
            label="Descripción"
            placeholder="Inserte la descripcion del producto"
            multiline
            name="description"
            variant="outlined"
            required
            onChange={handleInputChange}
            //   value={input.description}
            />
        </Grid>
        </Grid>
        <Button
                type="submit"
                fullWidth
                variant="contained"
                color="primary"
                className={classes.submit}
            >
                Crear
            </Button>
    </form>
    </div>
    <Box mt={5}>
    <Copyright />
    </Box>
    </Container>
    )
}
