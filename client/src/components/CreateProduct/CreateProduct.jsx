import React, { useState, useEffect } from 'react';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../UploadImageButton/styleButtonUpload.css'
import UploadImgButton from '../UploadImageButton/UploadImageButton'
import IconButton from '@material-ui/core/IconButton'
import Copyright from '../utils/Copyright.js'
import { useParams, useLocation } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
// import ImagesPreview from '../utils/ImagesPreview'
import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import swal from 'sweetalert';


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
  },
  imageName: {
    width: '60%',
    margin: '5px auto',
    padding: '5px',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: '10px',
    background: '#d9e7ff'
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


export default function SignUp(props) {
  const classes = useStyles();
  const { id } = useParams()
  const url = useLocation();
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState(null);
  const [check, setCheck] = useState(null);
  const [msg, setMsg] = useState(null)
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    stock: 0,
    price: 0,
    image: null,
    category: null
  })

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
  }

  const resetForm = () => {
    setInputs({ ...inputs, name: '', description: '', stock: 0, price: 0, image: null, category: null })
    setFiles(null)
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
          setInputs({
            ...inputs,
            name: data.name,
            description: data.description,
            price: data.price,
            stock: data.stock,
            image: data.image,
            category: data.category
          })
        })
    }
  }, [url])

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
          name: inputs.name,
          description: inputs.description,
          price: inputs.price,
          stock: inputs.stock,
          image: data,
          category: Object.keys(check)
        };
        if (url.pathname === `/admin/editproduct/${id}`) {
          editProduct(product)
        }
        else {
          createProduct(product)
        }
      })
      .catch(err => console.log(err))

    resetForm()
  }

  const createProduct = (product) => {
    try {
      const newProduct = fetch('http://localhost:3001/products', {
        method: 'POST',
        body: JSON.stringify(product),
        headers: {
          'Content-Type': 'application/json'
        }
      })
        .then(data => data.json())
        .then(res => setMsg(res))
    } catch (error) {
      console.log(error)
      alert('something went wrong..!')
    }

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
      swal("Upa", "No se ha editado el producto", "error");

    }
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    uploadImage()
    swal("Genial!", "Se ha creado el producto exitosamente!", "success");

  }

  const filesHandler = function (event) {
    setFiles(event.target.files)
  };



  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  }

  const removeFile = (i) => {
    const newFiles = Array.from(files)
    newFiles.splice(i, 1)
    setFiles(newFiles)
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Typography component="h1" variant="h5">
          {url.pathname.includes('/admin/editproduct') ? 'EDITAR PRODUCTO' : 'NUEVO PRODUCTO'}
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit} >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                placeholder={inputs.name}
                name="nameProduct"
                variant="outlined"
                value={inputs.name}
                required
                fullWidth
                onChange={handleInputs}
                label="Nombre del producto"
                autoFocus
                name='name'
              />
            </Grid>
            <Grid item xs={12} className={classes.checkbox}>
              {categories && categories.map((cat, i) => (
                <FormGroup row key={i}>
                  <FormControlLabel
                    control={<Checkbox
                      onChange={handleChange}
                      name={cat.id}
                      value={check}
                    />}
                    label={cat.name}
                  />
                </FormGroup>
              ))}
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Descripción"
                placeholder={inputs.description}
                value={inputs.description}
                multiline
                variant="outlined"
                onChange={handleInputs}
                requiered
                name='description'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={handleInputs}
                placeholder={inputs.price}
                value={inputs.price}
                variant="outlined"
                required
                fullWidth
                label="Precio"
                type='number'
                name="precio"
                name='price'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                placeholder={inputs.stock}
                value={inputs.stock}
                onChange={handleInputs}
                variant="outlined"
                required
                fullWidth
                name="stock"
                label="Stock"
                type="number"
              />
            </Grid>
          </Grid>
          <UploadImgButton onChange={filesHandler} />
          {files &&
            // <ImagePreview images={files}/>
            Array.from(files).map((file, i) => <div className={classes.imageName}>
              <div style={{ display: 'flex' }}>
                <span>{file.name}</span>
                <IconButton
                  onClick={(i) => removeFile(i)}
                  size='small' style={{ marginLeft: 'auto' }}>
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </div>)
          }
          {/* para el editado mostrar las imagenes con un preview (Claudio) */}
          {/* {inputs.image &&
            inputs.image.map((img, i) => <div className={classes.imageName}>
              <div style={{ display: 'flex' }}>
                <span>{img}</span>
                <IconButton
                  onClick={(i) => removeFile(i)}
                  size='small' style={{ marginLeft: 'auto' }}>
                  <HighlightOffIcon />
                </IconButton>
              </div>
            </div>)
          } */}
          <Button onClick={handleSubmit}
            disabled={!inputs.name || !inputs.description || !inputs.price || !inputs.stock}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Crear
          </Button>
        </form>
        {
          msg &&
          <div className={classes.msg} style={{ background: `${msg.status === 400 ? '#ff4f4f' : '#1df5a9'}` }}>
            <span>{msg.msg}</span>
          </div>
        }
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
