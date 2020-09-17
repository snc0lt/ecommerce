import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { useLocation, Link } from "react-router-dom";
import AdminOrder from './AdminOrder';

// Generate Order Data
function createData(id, date, name, shipTo, paymentMethod, amount) {
  return { id, date, name, shipTo, paymentMethod, amount };
}

function preventDefault(event) {
  event.preventDefault();
}

const useStyles = makeStyles((theme) => ({
  seeMore: {
    marginTop: theme.spacing(3),
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Orders() {
  const classes = useStyles();
  const [orders, setOrders] = useState(null)
  let query = useQuery().get('search');
  const [price, setPrice] = useState([])
  const url = useLocation()

  useEffect(() => {
    let arr = []
    if (orders) {
      for (let i of orders) {
        var sum = 0
        for (let j of i.products) {
          sum = sum + (j.order_product.price * j.order_product.quantity)
          // sum = sum + (i.products.order_product.price * i.products.order_product.quantity)
        }
        arr.push(sum)
      }
      setPrice(arr)
    }
  }, [orders])

  // console.log(price)

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
    <>
      {orders &&
        <>
          <Title>Ordenes recientes</Title>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Fecha</TableCell>
                <TableCell>Hora</TableCell>
                <TableCell>Cliente</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Detalle</TableCell>
                <TableCell align="right">Monto total</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {orders.map((row, i) => (
                row.state === 'creada'
                  ? null
                  : <TableRow key={row.id} hover={true}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.createdAt.slice('T', 10)}</TableCell>
                    <TableCell>{row.createdAt.split('T')[1].slice(0, 5)}</TableCell>
                    <TableCell>{row.user.firstName + ' ' + row.user.lastName}</TableCell>
                    <TableCell>{row.state}</TableCell>
                    <TableCell><AdminOrder orderId={row.id} /></TableCell>
                    <TableCell align="right">$ {price[i]}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className={classes.seeMore}>
            {url.pathname === '/admin/panel' ?
              <Link color="primary" to='/admin/orders'>
                Ver mas ordenes
              </Link>
              :
              null
            }
          </div>
        </>
      }
    </>
  );
}