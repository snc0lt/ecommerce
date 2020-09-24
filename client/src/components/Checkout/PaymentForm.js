import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

export default function PaymentForm() {
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Metodo de pago
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <TextField required id="cardName" label="Nombre del titular" fullWidth autoComplete="cc-name" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cardNumber"
            label="Numero de tarjeta"
            fullWidth
            autoComplete="cc-number"
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField required id="expDate" label="Fecha de expiracion" fullWidth autoComplete="cc-exp" />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            required
            id="cvv"
            label="CVV"
            helperText="Digitos de seguridad"
            fullWidth
            autoComplete="cc-csc"
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveCard" value="yes" />}
            label="Recordar los datos de la tarjeta"
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
}