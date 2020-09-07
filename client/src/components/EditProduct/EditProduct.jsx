import React, {useState,useEffect} from 'react';
//import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
//import FormControlLabel from '@material-ui/core/FormControlLabel';
//import Link from '@material-ui/core/Link';
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
//import NativeSelect from '@material-ui/core/NativeSelect'
//import { Input } from '@material-ui/core';
//import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import Copyright from '../utils/Copyright.js'
//import { useLocation } from 'react-router-dom';

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

  class KeyGen{
    constructor(i, key){
      this.i = 1;
      this.key = function(){
        this.i = this.i + 1;
        return(this.i);
      }
    }
  }

  export default function Edit(props) {
    console.log("render");
    const classes = useStyles();
  
    const [stateCategory,setStateCategory] = useState([]);
    const [categories, setCategories] =useState([]);
    const [name, setName] =useState('');
    const [category,setCategory] = useState('');
    const [description,setDescription] = useState('');
    const [price,setPrice] = useState('');
    const [stock,setStock] = useState('');
    const [files,setFiles] = useState([]);
    const [producto, setProducto] = useState()
  
    const [images, setImages] = useState([]);

    //---------fetch para obtener los campos almacenados del producto por el ID
    useEffect(function(){
        fetch('http://localhost:3001/category',{
        method:'GET'
      })
      .then(function(response){
        return response.json();
      })
      .then(function(arr){
        console.log(arr);
        setCategories(arr);
      })
      .catch(function(err){
        console.log(err)
    });
    },[]);

    useEffect(function(){
        fetch(`http://localhost:3001/products/${props.id}`,{
          method:'GET'
      })
      .then(res=>res.json())
      .then(function(res){
          console.log("res: ",res)
          setName(res.name);
          setDescription(res.description);
          setStock(res.stock);
          setPrice(res.price);
          setImages(res.image);
      })
      .catch(function(err){
        console.log(err)
    });
    },[]);

    const handleSubmit=function(){
        console.log("manejo el submit");
        console.log(description);
        alert("description");
    }

    const filesHandler=function(event){
        console.log(event.target.files)
        setFiles(event.target.files)
      };
    
      const handleName=function(event){
        setName(event.target.value)
      }
    
      const handleCategory=function(event){
        //console.log(event.target.value);
        setCategory(event.target.value);
      }
    
      const handleDescription = function(event){
        console.log(event.target.value);
        setDescription(event.target.value);
      }
    
      const handlePrice = function(event){
        console.log(event.target.value);
        setPrice(event.target.value);
      }
    
      const handleStock = function(event){
        console.log(event.target.value);
        setStock(event.target.value);
      }
    
      const keySelect= new KeyGen();

    return (
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <div className={classes.paper}>
            <Typography component="h1" variant="h5">
              EDITAR PRODUCTO
            </Typography>
            <form className={classes.form} noValidate onSubmit={handleSubmit} >
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    defaultValue = {name}
                    autoComplete="fname"
                    name="nameProduct"
                    variant="outlined"
                    required
                    fullWidth
                    onChange={handleName}
                    // id="firstName"
                    label="Nombre del producto"
                    autoFocus
                  />
                </Grid>
                <Grid item xs={12} >
                <FormControl variant="outlined" className={classes.formControl} fullWidth>
            <InputLabel id="demo-simple-select-outlined-label">Categoría</InputLabel>
            <Select
              labelId="demo-simple-select-outlined-label"
              id="demo-simple-select-outlined"
              native
              value={category}
              onChange={handleCategory}
              label="Categoría" 
            >
              <option aria-label="None" value="" />
              {categories.map((c)=> <option value={c.id} key={keySelect.key()}>{c.name}</option>)}
            </Select>
          </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <TextField className='styleDescripcion'
                    fullWidth
                    id="outlined-textarea"
                    label="Descripción"
                    placeholder={description}
                    multiline
                    variant="outlined"
                    onChange={handleDescription}
                    requiered
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handlePrice}
                    variant="outlined"
                    required
                    fullWidth
                    // id="email"
                    label="Precio"
                    type='number'
                    name="precio"
                    defaultValue={price}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleStock}
                    variant="outlined"
                    required
                    fullWidth
                    name="stock"
                    label="Stock"
                    type="number"
                    defaultValue={stock}
                    // id="password"
                  />
                </Grid>
              </Grid>
              <UploadImgButton onChange={filesHandler}/>
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
      );

  
}

