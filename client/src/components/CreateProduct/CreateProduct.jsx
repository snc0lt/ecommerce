import React, { useState, useEffect } from 'react';
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
import { useParams, useLocation } from 'react-router-dom';
// import ProductCheckbox from '../utils/ProductCheckbox'
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import { Carrousel } from '../Carrousel/Carrousel';
// import ProgressCircle from '../utils/ProgressCircle';


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
  checkbox: {
    display: 'flex',
  }
}));

class KeyGen {
  constructor(i, key) {
    this.i = 1;
    this.key = function () {
      this.i = this.i + 1;
      return (this.i);
    }
  }
}

export default function SignUp(props) {
  const classes = useStyles();
  const { id } = useParams()
  const url = useLocation();
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState('');
  const [category, setCategory] = useState([]);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('');
  const [files, setFiles] = useState();
  const [producto, setProducto] = useState()
  const keySelect = new KeyGen();

  const initialState = []

  const [check, setCheck] = useState([]);

  const fileReader = (event) => {
    var reader = new FileReader();
    var file = event.target.files
    reader.onload = function(event) {
      // The file's text will be printed here
      console.log(event.target.result)
    };
    reader.readAsText(file);
  }
  useEffect(() => {
    fetch('http://localhost:3001/category', {
      method: 'GET'
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (arr) {
        setCategories(arr);
      })
  }, []);

  useEffect(() => {
    if (url.pathname.includes('/admin/editproduct')) {
      fetch(`http://localhost:3001/products/${id}`)
        .then(res => res.json())
        .then(data => {
          setProducto(data)
          console.log(data)
        })
    }
  }, [])

  const uploadImage = () => {
    let formData = new FormData();
    for (var i = 0; i < files.length; i++) {
      formData.append('images', files[i]);
    }
    fetch('http://localhost:3001/image', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        const product = {
          name,
          description,
          price,
          stock,
          image: data,
          category: Object.keys(check)
        };
        if (url.pathname === `/admin/editproduct/${id}`) {
          editProduct(product)
          console.log('editaste el producto')
        }
        else {
          createProduct(product)
          console.log('creaste el producto')
        }
      })
      .catch(err => console.log(err))


  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setPrice('')
    setStock('')
    setFiles()
  }

  console.log('checks', check)
  console.log(Object.keys(check))

  const createProduct = (product) => {
    try {
      const newProduct = fetch('http://localhost:3001/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(newProduct)
    } catch (error) {
      console.log(error)
      alert('something went wrong..!')
    }
    resetForm()
  }

  const editProduct = (product) => {
    try {
      const updatedProduct = fetch(`http://localhost:3001/products/${id}`, {
        method: 'PUT',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      console.log(updatedProduct)
    } catch (err) {
      console.log(err)
    }
    resetForm()
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    uploadImage()
    // console.log('aqui va la imagen')
    alert('PRODUCTO CREADO CON EXITO')
  }


  const filesHandler = function (event) {

    setFiles(event.target.files)
  };

  const handleName = function (event) {
    setName(event.target.value)
  }

  const handleCategory = function (event) {

    setCategory(...category, event.target.value);
  }

  const handleDescription = function (event) {

    setDescription(event.target.value);
  }

  const handlePrice = function (event) {

    setPrice(event.target.value);
  }

  const handleStock = function (event) {

    setStock(event.target.value);
  }

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  };

  console.log(files)
  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          NUEVO PRODUCTO
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder={producto && producto.name}
                name="nameProduct"
                variant="outlined"
                required
                fullWidth
                onChange={handleName}
                label="Nombre del producto"
                autoFocus
                value={name}
              />
            </Grid>
            <Grid item xs={12} className={classes.checkbox}>
              {categories && categories.map((cat, i) => (
                // if (!name && !description && !price && !stock) {
                // }
                <FormGroup row key={i}>
                  <FormControlLabel
                    control={<Checkbox
                      onChange={handleChange}
                      name={cat.id}
                      // defaultChecked= {!name || !description || !price || !stock ? Object.values(check) : false}
                      value={check}
                      />}
                    label={cat.name}
                  />
                </FormGroup>
                // <ProductCheckbox handleCategory={handleCategory} setCategory={setCategory} cat={cat} key={i}/>
              ))}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Descripción"
                placeholder={producto && producto.description}
                multiline
                variant="outlined"
                onChange={handleDescription}
                requiered
                value={description}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handlePrice}
                placeholder={producto && producto.price}
                variant="outlined"
                required
                fullWidth
                label="Precio"
                type='number'
                name="precio"
                value={price}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder={producto && producto.stock}
                onChange={handleStock}
                variant="outlined"
                required
                fullWidth
                name="stock"
                label="Stock"
                type="number"
                value={stock}
              />
            </Grid>
          </Grid>
          <UploadImgButton onChange={filesHandler} />
          { files && 
            // <ImagePreview images={files}/>
          Array.from(files).map(file => <div><span>{file.name}</span></div>)
          }
          {/* <ImagesPreview image={files}/> */}
          <Button onClick={handleSubmit}
            disabled={!name || !description || !price || !stock}
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
