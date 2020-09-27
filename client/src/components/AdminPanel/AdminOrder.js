import React, { useState, useEffect } from 'react'


// Material-UI imports 
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import IconButton from '@material-ui/core/IconButton'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import { Link } from 'react-router-dom'


const useStyles = makeStyles((theme) => ({
  container: {
    margin: theme.spacing(1, 8),
    width: '350px'
  },
  listItem: {
    padding: theme.spacing(2, 0),
  },
  total: {
    fontWeight: 700,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  resumen: {
    display: 'flex',
  },
  list: {
    '&:hover': {
      background: '#3F75CE',
      color: '#3F75CE'
    }
  }
}));


const AdminOrder = ({ orderId }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [order, setOrder] = useState(null)
  let orderTotal = 0

  if (order) {
    order.products.map((prodtotal) => (
      orderTotal = orderTotal + (prodtotal.price * prodtotal.order_product.quantity)
    ))
  }

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetch(`http://localhost:3001/orders/${orderId}`)
      const orderX = await data.json()
      setOrder(orderX)
    }
    fetchData()
  }, [])

  return (
    <div>
      <IconButton color="primary" onClick={handleClickOpen}>
        <MenuOpenIcon fontSize='small' />
      </IconButton>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {order &&
          <div className={classes.container}>
            <DialogTitle id="alert-dialog-title">Orden - {order.state}</DialogTitle>
            <DialogContent>
              <Typography variant="h6" gutterBottom>
                {order.user.firstName} {order.user.lastName}
              </Typography>
              <div className={classes.resumen} style={{ justifyContent: 'space-between' }}>
                <Typography variant="body1" gutterBottom>
                  Resumen de compra
                </Typography>
                <div style={{ marginLeft: 'auto' }}>
                  <Typography variant="body1" gutterBottom>
                    Total
                </Typography>
                </div>
              </div>
              <List disablePadding>
                {order.products.map((product) => (
                  <Link key={product.id} to={{ pathname: `/products/${product.id}` }} className={classes.list} >
                    <ListItem className={classes.listItem} >
                      <ListItemText primary={`${product.name} x${product.order_product.quantity}`} /*secondary={product.description}*/ />
                      <Typography variant="body2">$ {product.price * product.order_product.quantity}</Typography>
                    </ListItem>
                  </Link>
                ))}
                <ListItem className={classes.listItem}>
                  <ListItemText primary="Total" />
                  <Typography variant="subtitle1" className={classes.total}>
                    $ {orderTotal}
                  </Typography>
                </ListItem>
              </List>
            </DialogContent>
          </div>
        }
        <DialogActions>
          <Button onClick={handleClose} color="primary" autoFocus>
            Salir
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default AdminOrder
