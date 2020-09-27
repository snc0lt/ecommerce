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
import {Link, useLocation} from 'react-router-dom'
import { useSelector } from 'react-redux'
// import BarChartIcon from '@material-ui/icons/BarChart';
// import LayersIcon from '@material-ui/icons/Layers';
// import AssignmentIcon from '@material-ui/icons/Assignment';
// import ListSubheader from '@material-ui/core/ListSubheader';

export default function PrimaryListItems(){
  const url = useLocation();
  const user = useSelector(state => state.userDetails)
  // const google = useSelector(state => state.userGoogle)
  //const { id } = useParams();
const primaryList = url.pathname.includes('/admin') ? (

<div>

<Link to='/admin/panel'>
<ListItem button>
  <ListItemIcon>
    <DashboardIcon />
  </ListItemIcon>
  <ListItemText primary="Resumen" />
</ListItem>
</Link>

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

<Link to='/admin/createproduct'>
<ListItem button>
  <ListItemIcon>
    <AddIcon />
  </ListItemIcon>
  <ListItemText primary="Crear producto" />
</ListItem>
</Link>

<Link to='/admin/products/edit'>
<ListItem button>
  <ListItemIcon>
    <EditIcon />
  </ListItemIcon>
  <ListItemText primary="Editar producto" />
</ListItem>
</Link>

<Link to='/admin/createcategory'>
<ListItem button>
  <ListItemIcon>
    <CategoryIcon />
  </ListItemIcon>
  <ListItemText primary="Crear categoria" />
</ListItem>
</Link>

<Link to='/admin/editCategory'>
<ListItem button>
  <ListItemIcon>
    <EditIcon />
  </ListItemIcon>
  <ListItemText primary="Editar categoria" />
</ListItem>
</Link>

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

{!user.isGoogle ? <Link to={`/user/resetpassword/${user.id}`}>
<ListItem button>
  <ListItemIcon>
    <PeopleIcon />
  </ListItemIcon>
  <ListItemText primary="Cambiar Contraseña" />
</ListItem>
</Link> : null}
</div>)
    return (<>{primaryList}</> 
)
    };