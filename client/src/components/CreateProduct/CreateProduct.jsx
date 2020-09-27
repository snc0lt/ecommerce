import React, { useState, useEffect } from 'react';
import { useDispatch } from "react-redux";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import DeleteIcon from '@material-ui/icons/Delete';
import CardMedia from '@material-ui/core/CardMedia';
import Card from '@material-ui/core/Card';
import { CardHeader, Tooltip } from '@material-ui/core';
import ImageUploader from 'react-images-upload';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import '../UploadImageButton/styleButtonUpload.css'
import IconButton from '@material-ui/core/IconButton'
import Copyright from '../utils/Copyright.js'
import { useParams, useLocation, useHistory } from 'react-router-dom';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
// import HighlightOffIcon from '@material-ui/icons/HighlightOff';
import swal from 'sweetalert';
import { createProduct } from "../../actions";

// import ImagesPreview from '../utils/ImagesPreview'


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
  },
  root: {
    width: 200,
    margin: '3%'
  },
  media: {
    height: 140,
    objectFit: 'contain',
  },

}));

export default function SignUp(props) {
  const classes = useStyles();
  const { id } = useParams()
  const url = useLocation();
  const [categories, setCategories] = useState([]);
  const [files, setFiles] = useState(null);
  const [check, setCheck] = useState(null);
  const [msg, setMsg] = useState(null)
  const history = useHistory()
  const [errors, setErrors] = useState({
    errName: '',
    errDesc: '',
    errPrice: '',
    errStock: ''
  })
  const [inputs, setInputs] = useState({
    name: '',
    description: '',
    stock: '',
    price: '',
    image: [],
    category: null
  })

  const handleInputs = (e) => {
    setInputs({ ...inputs, [e.target.name]: e.target.value })
    setErrors({
      errName: '',
      errDesc: '',
      errPrice: '',
      errStock: ''
    })
  }

  const resetForm = (e) => {
    setInputs({ ...inputs, name: '', description: '', stock: 0, price: 0, image: [], category: null });
    setFiles(null);
  }

  const dispatch = useDispatch()

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
  }, [check, files]);

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

  const onBlurName = () => {
    if (!inputs.name || inputs.name.length === 0) setErrors({ ...errors, errName: 'este campo es requerido' })
  }
  const onBlurDescription = () => {
    if (!inputs.description || inputs.description.length === 0) setErrors({ ...errors, errDesc: 'este campo es requerido' })
  }
  const onBlurStock = () => {
    if (!inputs.stock || inputs.stock.length === 0) setErrors({ ...errors, errStock: 'este campo es requerido' })
  }
  const onBlurPrice = () => {
    if (!inputs.price || inputs.price.length === 0) setErrors({ ...errors, errPrice: 'este campo es requerido' })
  }

  const uploadImage = async () => {
    let formData = new FormData();
    if (files && files.length > 0) {
      for (var i = 0; i < files.length; i++) {
        formData.append('images', files[i]);
      }
    }

    let cat = []

    for (let i in check) {
      if (check[i] === true) {
        cat.push(i)
      }
    }
    try {
      const uploadImg = await fetch('http://localhost:3001/image', {
        method: 'POST',
        body: formData
      })

      const img = await uploadImg.json()
      setFiles(null)
      let prevImg = []
      if (inputs.image) {
        for (let j of inputs.image) {
          prevImg.push(j);
        }
      }
      const product = {
        name: inputs.name,
        description: inputs.description,
        price: inputs.price,
        stock: inputs.stock,
        image: [...img, ...prevImg],
        category: cat
      };
      if (url.pathname === `/admin/editproduct/${id}`) {
        editProduct(product)
        resetForm()
      }
      else {
        dispatch(createProduct(product, setMsg))
        createProduct(product)
        resetForm()
      }
    } catch (err) {
      console.log(err)
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
    } catch (err) {
      console.log(err)
      swal("Upa", "No se ha editado el producto", "error");

    }
  }

  const handleSubmit = function (e) {
    e.preventDefault()
    uploadImage()
    setFiles(null)
    swal("Genial!", "Se ha creado el producto exitosamente!", "success");
    return url.pathname.includes('/admin/createproduct') ?
    history.push('/admin/panel')
    :
    history.push('/admin/panel')
  }

  const filesHandler = function (files) {
    setFiles(files)
  };

  const handleChange = (event) => {
    setCheck({ ...check, [event.target.name]: event.target.checked });
  }

  const removeFile = (i) => {
    // const newFiles = Array.from(files)
    let prevImages = inputs.image
    prevImages.splice(i, 1)
    setInputs({
      ...inputs,
      name: inputs.name,
      description: inputs.description,
      price: inputs.price,
      stock: inputs.stock,
      image: prevImages,
      category: inputs.category
    })
    // newFiles.splice(i, 1)
    // setFiles(newFiles)
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
                onBlur={onBlurName}
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
            {
              errors.errName &&
              <div className={classes.msg} style={{ background: '#ff4f4f' }}>
                <span>{errors.errName}</span>
              </div>
            }
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
                onBlur={onBlurDescription}
                fullWidth
                id="outlined-textarea"
                label="Descripción"
                value={inputs.description}
                multiline
                variant="outlined"
                onChange={handleInputs}
                required
                name='description'
              />
            </Grid>
            {
              errors.errDesc &&
              <div className={classes.msg} style={{ background: '#ff4f4f' }}>
                <span>{errors.errDesc}</span>
              </div>
            }
            <Grid item xs={12}>
              <TextField
                onBlur={onBlurPrice}
                onChange={handleInputs}
                value={inputs.price}
                variant="outlined"
                required
                fullWidth
                label="Precio"
                type='number'
                name='price'
              />
            </Grid>
            {
              errors.errPrice &&
              <div className={classes.msg} style={{ background: '#ff4f4f' }}>
                <span>{errors.errPrice}</span>
              </div>
            }
            <Grid item xs={12}>
              <TextField
                onBlur={onBlurStock}
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
            {
              errors.errStock &&
              <div className={classes.msg} style={{ background: '#ff4f4f' }}>
                <span>{errors.errStock}</span>
              </div>
            }
          </Grid>
          <div style={{ display: 'flex' }}>
            {inputs.image && inputs.image.length > 0 && inputs.image.map((img, i) =>
              <>
                <Card className={classes.root} key={img}>
                  <CardHeader action={
                    <Tooltip title='Eliminar imagen'>
                      <IconButton aria-label="deleteImage" onClick={() => removeFile(i)} >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>} />
                  <CardMedia className={classes.media} image={`http://localhost:3001/images/${img}`} />
                </Card>

              </>
            )}
          </div>
          <ImageUploader
            withIcon={false}
            buttonText='Adjuntar imágenes'
            onChange={filesHandler}
            imgExtension={['.jpg', '.jpeg', '.png', '.PNG']}
            maxFileSize={52428800}
            withPreview={files ? true : false}
          />
          {
            url.pathname.includes('/admin/editproduct') ?
            <Button onClick={handleSubmit}
            disabled={!inputs.name || !inputs.description || !inputs.price || !inputs.stock || !check}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {url.pathname.includes('/admin/editproduct') ? 'Editar producto' : 'Crear'}
          </Button>
          :
          <Button onClick={handleSubmit}
            disabled={!inputs.name || !inputs.description || !inputs.price || !inputs.stock || !check || !files}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            {url.pathname.includes('/admin/editproduct') ? 'Editar producto' : 'Crear'}
          </Button>
          }
        </form>
      </div>
      <Box mt={5}>
        <Copyright />
      </Box>
    </Container>
  );
}
