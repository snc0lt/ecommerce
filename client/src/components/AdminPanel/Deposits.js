import React, { useState, useEffect } from 'react';
import Link from '@material-ui/core/Link';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Title from './Title';
import {useLocation} from 'react-router-dom'

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles({
  depositContext: {
    flex: 1,
  },
});

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Deposits() {
  const classes = useStyles();
  const [orders, setOrders] = useState(null)
  var months = ["Enero", "Febrero", "Marzo", "Abril", "MAyo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];
  const [total, setTotal] = useState();
  let query = useQuery().get('search');

  useEffect(() => {
    var sum = 0
    if (orders) {
      for (let i of orders) {
        if (i.state !== 'creada') {
          for (let j of i.products) {
            sum = sum + (j.order_product.price * j.order_product.quantity)
            // sum = sum + (i.products.order_product.price * i.products.order_product.quantity)
          }
        }
      }
      setTotal(sum)
    }
  }, [orders])

  useEffect(() => {
    if (query) {
      fetch(`http://localhost:3001/orders/admin?search=${query}`)
        .then(res => res.json())
        .then(data => {
          setOrders(data)
        })
    }
    else {
      fetch(`http://localhost:3001/orders/admin`)
        .then(res => res.json())
        .then(data => {
          setOrders(data)
        })
    }
  }, [query])

  return (
    <React.Fragment>
      <Title>Depositos recientes</Title>
      <div></div>
      <Typography component="p" variant="h4">
        $ {total}
      </Typography>
      <Typography color="textSecondary" className={classes.depositContext}>
        el {new Date().getDate()} de {months[new Date().getMonth()]}, {new Date().getFullYear()}
      </Typography>
      <div>
        <Link color="primary" href="#" onClick={preventDefault}>
          Ver balance
        </Link>
      </div>
    </React.Fragment>
  );
}