import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import { red } from '@material-ui/core/colors';
import iphoneImage from '../../testImages/iphone.jpeg'
import Rating from '../Rating/Rating'
import Button from '@material-ui/core/Button';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import { Tooltip } from '@material-ui/core';
import { useLocation, Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import CategoryIcon from '@material-ui/icons/Category';
import DeleteDialog from '../ConfirmationDialog/DeleteDialog'

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 250,
    maxHeight: 450
  },
  media: {
    height: 0,
    objectFit: 'contain',
    paddingTop: '100%'
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function ProductCard(props) {
  const classes = useStyles();
  const url = useLocation();
  const boton = url.pathname === '/admin/products/edit'
    ? (<>
      <Link to={`/admin/editproduct/${props.productos.id}`}>
        <IconButton>
          <Tooltip title='Editar producto'>
            <EditIcon color='primary' />
          </Tooltip>
        </IconButton>
      </Link>

      <DeleteDialog props={props} />

    </>)
    : url.pathname === '/admin/products/edit_category'
      ? (<IconButton>
        <Tooltip title='Editar categoria'>
          <CategoryIcon color='primary' />
        </Tooltip>
      </IconButton>)
      : (<>
        <Button variant="contained" color="primary" size="small">
          Comprar
        </Button>
        <Tooltip title='Añadir al carrito'>
          <IconButton aria-label="addToCart">
            <ShoppingCartIcon color='primary' />
          </IconButton>
        </Tooltip>
      </>)

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Rating />
        }
      />
      <CardMedia
        className={classes.media}
        image={`http://localhost:3001/images/${props.productos.image[0]}`}
      />
      <CardContent>
        <Link to={`/products/${props.productos.id}`}>
          <Typography variant='body2' color="textSecondary" component="p">
            {props.productos.name}
          </Typography>
        </Link>
        <Typography gutterBottom variant='body1' color='primary' component='p'>
          {props.productos.price}
        </Typography>

      </CardContent>
      <CardActions disableSpacing>
        {boton}
      </CardActions>
    </Card>
  );
}
