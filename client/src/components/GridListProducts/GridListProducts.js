import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import ProductCard from '../Products/ProductCard'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    marginTop:'50px',
    width: '100%',
    height: '100%',
  },
}));

export default function ImageGridList(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={450} className={classes.gridList} cols={4} spacing={24}>
        {props.productos.map((prod) => (
          <GridListTile key={prod.id} cols={1}>
                <ProductCard productos={prod}/>
          </GridListTile>
        ))}
      </GridList>
    </div>
  );
}
