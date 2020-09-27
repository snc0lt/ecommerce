import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Rating from '../Rating/Rating'
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import iphoneImage from '../../testImages/iphone.jpeg'
import CarouselCard from '../ImgProductCardCarousel/CarouselCard';
import ProductDetailsDescription from './ProductDetailsDescription'
import { useDispatch, useSelector } from "react-redux";
import { getProductDetail, addProductCart, addProductToGuestCart } from "../../actions";


const useStyles = makeStyles((theme) => ({
  root: {
    height: '80vh',
    marginTop: '5%'
  },
  root2: {
    marginTop: '10%',
    marginBottom: '10%',
  },
  image: {
    backgroundImage: `url(${iphoneImage})`,
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    height: '100%',
    objectFit: 'contain',
    paddingTop: '60%'
  },
  paper: {
    margin: theme.spacing(4, 4),
    alignItems: 'flex-start',
  },
  buttons: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  }
}));

export default function ProductDetails() {
  const classes = useStyles();
  const { id } = useParams()
  const dispatch = useDispatch()
  const product = useSelector(state => state.productDetail)
  const userId = useSelector(state => state.userDetails)
  const history = useHistory();

  const [review, setReview] = useState()

  useEffect(() => {
    dispatch(getProductDetail(id))
  }, [id])
  useEffect(() => {
    if (product) {
      fetch(`http://localhost:3001/products/${id}/productreview`)
        .then(data => data.json())
        .then(res => setReview(res))
        .catch(err => console.log(err))
    }

  }, [id])


  const comprar = (e) => {
    e.preventDefault()
    if (product && userId) {
      dispatch(addProductCart(userId.id, id, product.price))
      history.push("/user/addressform")
    } else {
      history.push('/user/login')
    }
  }

  const addtoCart = (e) => {
    e.preventDefault()
    if (product && userId) {
      dispatch(addProductCart(userId.id, id, product.price))
    } else if (!userId && product) {
      dispatch(addProductToGuestCart(product))
    }
  }
  let totalScore = 0
  review && review.map(rev => totalScore = (totalScore + rev.score))
  let score = review && (totalScore / review.length)
  return (
    <>{product && <>
      <Container maxWidth="md">
        <Grid container component="main" className={classes.root}>
          <CssBaseline />
          <Grid item xs={false} sm={6} md={7}>
            <div className={classes.paper}>
              <CarouselCard image={product && product.image} />
            </div>
          </Grid>
          <Grid item xs={12} sm={6} md={5} component={Paper} elevation={6} square>
            <div className={classes.paper}>
              <Typography component="div">
                <Box fontWeight="fontWeightBold" fontSize={26} m={1}>
                  {product && product.name}
                </Box>
              </Typography>
              <div>
                <Rating review={score && score} total={review && review}/>
              </div>
            </div>
            <div className={classes.paper}>
              <Typography component="h4" variant="h4" color='primary'>
               $ {product && product.price}
              </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                {product && product.stock !== 0 ? `${product.stock} - Disponible` : 'No Disponible - Sin Stock'}
              </Typography>
            </div>
            <div className={classes.paper}>
              <Typography variant='body1' color='textPrimary'>
                Descripción del producto
      </Typography>
              <Typography variant='subtitle2' color='textSecondary'>
                <span>{product && product.description}</span>
              </Typography>
            </div>
            <div className={classes.buttons}>
              <Button onClick={comprar} disabled={!product || product.stock === 0} variant="contained" color="primary" size="medium" style={{ padding: '5px 25px' }}>
                Comprar
          </Button>
              <Button
                onClick={addtoCart}
                disabled={!product || product.stock === 0} variant="outlined"
                color="primary" size='medium' style={{ marginLeft: 'auto', padding: '5px 25px' }}>
                Carrito
        </Button>
            </div>
          </Grid>
        </Grid>
        {review &&
          <ProductDetailsDescription classes={classes} review={review} />
        }
      </Container></>}</>

  );
}
