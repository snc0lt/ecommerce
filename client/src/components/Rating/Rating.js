import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';

// const useStyles = makeStyles({
//   root: {
//     width: 200,
//     display: 'flex',
//     alignItems: 'center',
//   },
// });

export default function HoverRating() {
  const [value, setValue] = React.useState(2);
  // const classes = useStyles();

  return (
    <div>
      <Box component="fieldset" mb={3} borderColor="transparent">
        <Rating name="read-only" value={value} readOnly />
      </Box>
    </div>
  );
}
