import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';


export default function HoverRating({ review, total }) {
  
  return (
    <div>
      { review && total && total.length >0 ?
      <Box component="fieldset" mb={3} borderColor="transparent">
      <Rating name="read-only" value={review} readOnly precision={0.5} />
      {total && total.length >0 &&
      <small style={{marginLeft: '10px'}}>({review}) - {total.length} reviews</small>}
    </Box>
    : null
    }
    </div>
  );
}
