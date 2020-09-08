import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ListSubheader from '@material-ui/core/ListSubheader';
import DashboardIcon from '@material-ui/icons/Dashboard';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import PeopleIcon from '@material-ui/icons/People';
import BarChartIcon from '@material-ui/icons/BarChart';
import LayersIcon from '@material-ui/icons/Layers';
import EditIcon from '@material-ui/icons/Edit';
import AddIcon from '@material-ui/icons/Add';
import AssignmentIcon from '@material-ui/icons/Assignment';
import CategoryIcon from '@material-ui/icons/Category';
import {useParams} from 'react-router-dom'

export default function PrimaryListItems(){

    const {name} = useParams();

    return (
    <div>
      <ListItem button component="a" href="https://localhost:3000/admin/panel">
        <ListItemIcon>
          <DashboardIcon />
        </ListItemIcon>
        <ListItemText primary="Resumen" />
      </ListItem>
  
  
      <ListItem button component="a" href="http://localhost:3000/admin/panel">
        <ListItemIcon>
          <ShoppingCartIcon />
        </ListItemIcon>
        <ListItemText primary="Ordenes" />
      </ListItem>
  
  
      <ListItem button component="a" href="http://localhost:3000/admin/panel">
        <ListItemIcon>
          <PeopleIcon />
        </ListItemIcon>
        <ListItemText primary="Clientes" />
      </ListItem>
  
  
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
      
    </div>
)
    };