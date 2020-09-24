import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { useLocation, Link, useParams } from "react-router-dom";
import AdminOrder from './AdminOrder';
import CreateReview from '../Userpanel/CreateReview'
import StateDialog from './StateDialog';

import FilterListIcon from '@material-ui/icons/FilterList';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { MenuItem } from '@material-ui/core';
import {Select} from '@material-ui/core';
import InputLabel from '@material-ui/core/InputLabel';


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
  const [userOrder,setUserOrder] = useState(null)
  const classes = useStyles();
  const [orders, setOrders] = useState(null)
  const [filter,setFilter]=useState('')
  const[open,setOpen]=useState(false)
  let query = useQuery().get('search');
  const [price, setPrice] = useState([])
  const url = useLocation()

  const {id} = useParams();

  useEffect(() => {
    let arr = []
    if (orders) {
      for (let i of orders) {
        var sum = 0
        for (let j of i.products) {
          sum = sum + (j.order_product.price * j.order_product.quantity)
        }
        arr.push(sum)
      }
      setPrice(arr)
    }
  }, [orders])

  useEffect(()=>{
    if(id){
      const fetchData = async()=>{
        const data = await fetch(`http://localhost:3001/orders/${id}/completa`)
        const res = await data.json()
        setUserOrder(res)
      }
      fetchData()
    }
  },[])

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
  }, [query,filter])

  if(orders){
    console.log("estados")
    let arr=[]
    orders.map(order=>arr.push(order.id))
    console.log(arr)

  }
  if(open){
    console.log(open)
  }

  const openFilter =() =>{
    setOpen(true)
  }

  const handleFilter=(event)=>{
    event.preventDefault()
    setFilter(event.target.value)
  }

  if(filter){
    console.log("filter: ",filter)
  }




  return (
    <>
      {orders && url.pathname.includes("/admin")?
        <>
          <Toolbar>

                {open?
                <>
                <InputLabel htmlFor="filtrar">Filtrar</InputLabel>
                <Select
                  id="filtrar"
                  onChange={handleFilter}
                  value={filter}
                >
                <MenuItem value="completa">Completa</MenuItem>
                <MenuItem value="procesando">Procesando</MenuItem>
                <MenuItem value="cancelada">Cancelada</MenuItem>
                <MenuItem value="despacho">En despacho</MenuItem>
                <MenuItem value=''>Ver todo</MenuItem>
                </Select>
                </>
                :<Tooltip title="Filter list">
                  <IconButton aria-label="filter list">
                  <FilterListIcon onClick={openFilter}/>
                  </IconButton>
                  </Tooltip>}
          </Toolbar>
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
                filter && filter === row.state || filter===''
                  ? <TableRow key={row.id} hover={true}>
                    <TableCell>{row.id}</TableCell>
                    <TableCell>{row.createdAt.slice('T', 10)}</TableCell>
                    <TableCell>{row.createdAt.split('T')[1].slice(0, 5)}</TableCell>
                    <TableCell>{row.user.firstName + ' ' + row.user.lastName}</TableCell>
                    <TableCell>
                    <StateDialog state={row.state} orderId={row.id}/>
                    </TableCell>
                    <TableCell><AdminOrder orderId={row.id} /></TableCell>
                    <TableCell align="right">$ {price[i]}</TableCell>
                  </TableRow>
                  : null
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
        </>: userOrder?
           <>
             <Title>Compras recientes</Title>
             <Table size="medium">
               <TableHead>
                 <TableRow>
                   <TableCell>Fecha</TableCell>
                   <TableCell>Hora</TableCell>
                   <TableCell>Producto</TableCell>
                   <TableCell>Cantidad</TableCell>
                   <TableCell>Precio</TableCell>
                   <TableCell>Total</TableCell>
                   <TableCell>Review</TableCell>
                 </TableRow>
               </TableHead>



               <TableBody>
                 {userOrder.map((row, i) => (
                      row.products.map((product, j)=>(
                      <TableRow key={j} hover={true}>
                       <TableCell>{row.createdAt.slice('T', 10)}</TableCell>
                       <TableCell>{row.createdAt.split('T')[1].slice(0, 5)}</TableCell>
                       <TableCell>{product.name}</TableCell>
                       <TableCell>{product.order_product.quantity}</TableCell>
                       <TableCell>{product.price}</TableCell>
                       <TableCell>{product.price * product.order_product.quantity}</TableCell>
                       <TableCell><CreateReview productId={product.id}/></TableCell>
                     </TableRow>
                      ))

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
           </>:
           null
      }
    </>
  );
}
