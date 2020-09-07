import React from 'react'
import { Grid, CssBaseline, Typography, Paper } from "@material-ui/core";

export default function ProductDetailsDescription({ classes, description }) {
  return (
    <Grid container component="main" className={classes.root2}>
      <CssBaseline />
      <Grid item xs={12} sm={12} md={12} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Typography component="h6" variant="h6">
            {/* ...Aqui esta mi description */}
            {description}
            </Typography>
        </div>
        <div className={classes.paper}>
          <Typography variant='body1' color='textPrimary'>
            {/* Soy un celular copado, por ahi algunos dicen que no valgo lo que cuesto, pero al c#r#j# los haters...! */}
            {description}
            </Typography>
        </div>
      </Grid>
    </Grid>
  );
}