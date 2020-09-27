import React, { useEffect, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Title from './Title';
import Button from '@material-ui/core/Button';
import VerifiedUserIcon from '@material-ui/icons/VerifiedUser';
import { promoteToAdmin, disableOrEnableUser } from '../../actions/index'
import PersonIcon from '@material-ui/icons/Person';
import BlockIcon from '@material-ui/icons/Block';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
  button: {
    margin: theme.spacing(0.5),
  },
}));



export default function Users() {
  const classes = useStyles();
  const [users, setUsers] = useState(null)
    
    useEffect(() => {
        fetch(`http://localhost:3001/user`)
        .then(res => res.json())
        .then(data => {
          setUsers(data)
        })
    }, [users])

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
                row.email === 'admin@admin.com' 
                ? null
                :
                <TableRow key={row.id} hover={true}>
                  <TableCell>{row.id}</TableCell>
                  <TableCell>{row.firstName}</TableCell>
                  <TableCell>{row.lastName}</TableCell>
                  <TableCell>{row.email}</TableCell>
                  <TableCell>
                    {row.active?"Habilitado":"Deshabilitado"}</TableCell>
                  <TableCell>{row.createdAt.slice('T', 10)} / {row.createdAt.split('T')[1].slice(0, 5)}</TableCell>
                  <TableCell>{row.updatedAt.slice('T', 10)} / {row.updatedAt.split('T')[1].slice(0, 5)}</TableCell>
                  <div>
                      {row.id && row.isAdmin ?
                  <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<VerifiedUserIcon />}
                    size='small'
                    onClick={() => promoteToAdmin(row.id, false)}
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
                   onClick={() => promoteToAdmin(row.id, true)}
                   >
                   User
                  </Button>
                      }
                  {row.id && row.active ?
                   <Button
                   variant="contained"
                   color="primary"
                   className={classes.button}
                   startIcon={<BlockIcon />}
                   size='small'
                   onClick={disableOrEnableUser(row.id, "DISABLE")}
                   >
                   Deshabilitar
                  </Button>
                  :
                  <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    startIcon={<CheckIcon />}
                    size='small'
                    onClick={disableOrEnableUser(row.id, "ENABLE")}
                    >
                    Habilitar
                   </Button>
                  }
                  </div>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </>
      }
    </>
  );
}