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

export default function ProductCard() {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardHeader
        action={
          <Rating />
        }
      />
      <CardMedia
        className={classes.media}
        image={iphoneImage}
        title="Paella dish"
      />
      <CardContent>
        <Typography variant='body2' color="textSecondary" component="p">
          Iphone 11 pro max
        </Typography>
        <Typography gutterBottom variant='body1' color='primary' component='p'>
          $1000.00
        </Typography>
        
      </CardContent>
      <CardActions disableSpacing>
        <Button variant="contained" color="primary" size="small">
          Buy
        </Button>
        <Tooltip title='add to cart'>
          <IconButton aria-label="addToCart">
            <ShoppingCartIcon color='primary' />
          </IconButton>
        </Tooltip>
      </CardActions>
    </Card>
  );
}
