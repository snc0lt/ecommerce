import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import { useLocation, Link } from "react-router-dom";
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import VpnKeySharpIcon from '@material-ui/icons/VpnKeySharp';
import { promoteToAdmin, removeUser, resetPassword, getUsers } from '../../actions/index'
import {useDispatch, useSelector} from 'react-redux'
import PersonIcon from '@material-ui/icons/Person';

const useStyles = makeStyles((theme) => ({
//   seeMore: {
//     marginTop: theme.spacing(3),
//   },
  button: {
    margin: theme.spacing(0.5),
  },
}));

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function Users() {
  const classes = useStyles();
  const users = useSelector(state => state.users)
  const dispatch = useDispatch()

useEffect(() => {
    dispatch(getUsers())
}, [users])

//   useEffect(() => {
//     let arr = []
//     if (orders) {
//       for (let i of orders) {
//         var sum = 0
//         for (let j of i.products) {
//           sum = sum + (j.order_product.price * j.order_product.quantity)
//           // sum = sum + (i.products.order_product.price * i.products.order_product.quantity)
//         }
//         arr.push(sum)
//       }
//       setPrice(arr)
//     }
//   }, [orders])

//   useEffect(() => {
//     // if (query) {
//     //   fetch(`http://localhost:3001/orders/admin?search=${query}`)
//     //     .then(res => res.json())
//     //     .then(data => {
//     //       setOrders(data)
//     //     })
//     // }
//     // else {
//       fetch(`http://localhost:3001/user`)
//         .then(res => res.json())
//         .then(data => {
//           setUsers(data)
//         })
//     // }
//   }, [])

  return (
    <>
      {users &&
        <>
          <Title>Listado de usuarios</Title>
          <Table size="medium">
            <TableHead>
              <TableRow>
                <TableCell>ID</TableCell>
                <TableCell>Nombre</TableCell>
                <TableCell>Apellido</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Estado</TableCell>
                <TableCell>Fecha creacion</TableCell>
                <TableCell>Ultima modificacion</TableCell>
              </TableRow>
            </TableHead>

            <TableBody>
              {users.map((row, i) => (
                row.state === 'creada' 
                ? null
                :
                <TableRow key={row.id} hover={true}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  {/* <TableCell>{row.ACAVAELESTADO(ACTIVE,DISABLE)}</TableCell> */}
                  <TableCell>Activo (hardcodeado)</TableCell>
                  <TableCell>{row.createdAt.slice('T', 10)} / {row.createdAt.split('T')[1].slice(0, 5)}</TableCell>
                  {/* <TableCell>{row.createdAt.split('T')[1].slice(0, 5)}</TableCell> */}
                  <TableCell>{row.updatedAt.slice('T', 10)} / {row.updatedAt.split('T')[1].slice(0, 5)}</TableCell>
                  <div>
                      {row.id && row.isAdmin ?
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<VerifiedUserIcon />}
                    size='small'
                    onClick={promoteToAdmin(row.id, false)}
                    >
                    Admin
                   </Button>
                   :
                   <Button
                   variant="contained"
                   color="primary"
                   className={classes.button}
                   startIcon={<PersonIcon />}
                   size='small'
                   onClick={promoteToAdmin(row.id, true)}
                   >
                   User
                  </Button>
                      }
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<DeleteIcon />}
                    size='small'
                    onClick={removeUser(row.id)}
                    >
                    Eliminar
                  </Button>
                  <Button
                  variant="contained"
                  size='small'
                  className={classes.button}
                  color="primary"
                //   onClick={resetPassword(row.id)}
                  >
                  <VpnKeySharpIcon />
                  </Button>
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* <div className={classes.seeMore}>
            {url.pathname === '/admin/panel' ?
              <Link color="primary" to='/admin/orders'>
                Ver mas ordenes
              </Link>
              :
              null
            }
          </div> */}
        </>
      }
    </>
  );
}