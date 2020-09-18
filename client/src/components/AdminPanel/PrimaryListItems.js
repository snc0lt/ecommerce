import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import CategoryIcon from '@material-ui/icons/Category';
import {Link, useLocation, useParams} from 'react-router-dom'
import { useSelector } from 'react-redux'
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import ListSubheader from '@material-ui/core/ListSubheader';

export default function PrimaryListItems(){
  const url = useLocation();
  const user = useSelector(state => state.userDetails)
  //const { id } = useParams();
const primaryList = url.pathname.includes('/admin') ? (<div>
<ListItem button component="a" href="http://localhost:3000/admin/panel">
  <ListItemIcon>
    <DashboardIcon />
  </ListItemIcon>
  <ListItemText primary="Resumen" />
</ListItem>

<Link to='/admin/orders'>
<ListItem button>
  <ListItemIcon>
    <ShoppingCartIcon />
  </ListItemIcon>
  <ListItemText primary="Ordenes" />
</ListItem>
</Link>

<Link to='/admin/users'>
<ListItem button>
  <ListItemIcon>
    <PeopleIcon />
  </ListItemIcon>
  <ListItemText primary="Clientes" />
</ListItem>
</Link>


<ListItem button component="a" href="http://localhost:3000/admin/createproduct">
  <ListItemIcon>
    <AddIcon />
  </ListItemIcon>
  <ListItemText primary="Crear producto" />
</ListItem>


<ListItem button component="a" href="http://localhost:3000/admin/products/edit">
  <ListItemIcon>
    <EditIcon />
  </ListItemIcon>
  <ListItemText primary="Editar producto" />
</ListItem>

<ListItem button component="a" href="http://localhost:3000/admin/createcategory">
  <ListItemIcon>
    <CategoryIcon />
  </ListItemIcon>
  <ListItemText primary="Crear categoria" />
</ListItem>

<ListItem button component="a" href={`http://localhost:3000/admin/editCategory`}>
  <ListItemIcon>
    <EditIcon />
  </ListItemIcon>
  <ListItemText primary="Editar categoria" />
</ListItem>

</div>)
: (<div>
<Link to={`/user/perfil/${user.id}`}>
<ListItem button>
  <ListItemIcon>
    <DashboardIcon />
  </ListItemIcon>
  <ListItemText primary="Mi perfil" />
  </ListItem>
</Link>

<Link to={`/user/miscompras/${user.id}`}>
<ListItem button>
  <ListItemIcon>
    <ShoppingCartIcon />
  </ListItemIcon>
  <ListItemText primary="Mis compras" />
</ListItem>
</Link>

<Link to={`/user/resetpassword/${user.id}`}>
<ListItem button>
  <ListItemIcon>
    <PeopleIcon />
  </ListItemIcon>
  <ListItemText primary="Cambiar Contraseña" />
</ListItem>
</Link>
</div>)
    return (<>{primaryList}</> 
)
    };