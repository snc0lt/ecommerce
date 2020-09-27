import React from 'react'
import { Grid, CssBaseline, Typography, Paper } from "@material-ui/core";
import AvatarReview from '../utils/AvatarReviews'

export default function ProductDetailsDescription({ classes, review }) {
  return (
    <Grid container component="main" className={classes.root2}>
      <CssBaseline />
      <Typography variant='h5'>
      Comentarios Recientes
      </Typography>
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        {review &&
          review.map(rev => (
            <div className='comment'>
              <div className={`${classes.paper}`}>
                <div className='avatar_comment'>
                  <div style={{marginTop: '10px'}}>
                  <AvatarReview alguien={rev.user}/>
                  </div>
                  <div>
                    <Typography variant="button" display="block" gutterBottom style={{ marginLeft: '20px' }}>
                      {rev.user.firstName} {rev.user.lastName}
                    </Typography>
                    <Typography variant='body2' color='textSecondary' style={{ marginLeft: '20px' }}>
                      {rev.comments}
                    </Typography>
                  </div>
                </div>
                {/* <Typography variant='subtitle2'>
                  {rev.createdAt.slice('T', 10)} {rev.createdAt.split('T')[1].slice(0, 5)}
                </Typography> */}
              </div>
            </div>
          ))
        }
      </Grid>
    </Grid>

  );
}