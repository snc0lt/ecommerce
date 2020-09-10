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
    width: '100%',
    height: '100%',
  },
}));

export default function ImagesPreview({ files }) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <GridList cellHeight={200} className={classes.gridList} cols={4} spacing={8}>
        {
          Array.from(files).map((file, i) => (
            <GridListTile key={i} cols={1}>
              <img src={file.path} alt={file.name} />
                {/* <ProductCard productos={file.path}/> */}
          </GridListTile>
          ))
        }
      </GridList>
    </div>
  );
}