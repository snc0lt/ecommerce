import React, { useState } from 'react';
import "../StyleForm.css"
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container' ;
import '../UploadImageButton/styleButtonUpload.css';
import Copyright from '../utils/Copyright.js';
import { useDispatch } from 'react-redux'
import { addCategory } from "../../actions";

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
    msg: {
        width: '60%',
        margin: '5px auto',
        padding: 'auto',
        alignItems: 'center',
        textAlign: 'center',
        color: 'white',
        justifyContent: 'center',
        borderRadius: '10px',
    }
}));

export default function FormCategory () {
    const classes = useStyles();
    const [errores, setErrores] = useState(null)
    const [input, setInput] = useState({
        name: '',
        description: ''
    });

    const dispatch = useDispatch()

    const handleInputChange = (e) => {
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setErrores(null)
    };
    const resetForm = () => {
        setInput({
            name: '',
            description: ''
        })
    };

    const onBlur = () => {
        if (!input.name || input.name.length === 0) setErrores({ ...errores, errMsg: 'es requerido un nombre para la categoria' })
    }
    const handleSubmit = (e) => {
        e.preventDefault();
        const newCategory = { name: input.name, description: input.description }
        dispatch(addCategory(newCategory))
        resetForm();
    }




return (

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
                                onBlur={onBlur}
                                fullWidth
                                onChange={handleInputChange}
                                value={input.name}
                                label="Nombre de la categoria"
                                autoFocus

                            />
                        </Grid>
                        {
                            errores &&
                            <div className={classes.msg} style={{ background: '#ff4f4f'}}>
                                <span>{errores.errMsg}</span>
                            </div>
                        }

                        <Grid item xs={12} > </Grid>

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
                                value={input.description}
                            />
                        </Grid>

                    </Grid>
                      <Button
                        disabled = {!input.name || !input.description}
                        type = "submit"
                        fullWidth
                        variant = "contained"
                        color = "primary"
                        className = {classes.submit}
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
