import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


export default function HoverRating({ review, total }) {
  const [value, setValue] = React.useState(2);
  // const classes = useStyles();
  console.log(typeof review)
  return (
    <div>
      { review && 
      <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating name="read-only" value={review} readOnly precision={0.5} />
      <small style={{marginLeft: '10px'}}>({review}) - {total.length} reviews</small>
    </Box>
    }
    </div>
  );
}
