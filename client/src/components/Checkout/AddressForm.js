import React, {useState, useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import {useSelector} from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';


export default function AddressForm() {
  const userId = useSelector(state => state.userDetails)
  const history = useHistory()
  const { id } = useParams()
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    phone: '',
    city: '',
    province: '',
    postalcode: '',
    country: '',
  })

  useEffect(() => {
    fetch(`http://localhost:3001/user/${userId.id}`)
    .then(res=>res.json())
    .then(data=> {
        setUser(data);
    })
}, [userId.id])

  const handleChange = (event) => {
    // setErrors(validate({ ...user, [event.target.name]: event.target.value }))
    setUser({ ...user, [event.target.name]: event.target.value });
  };

  const handleSubmit = async function (e) {
    e.preventDefault()
    const envio = {
        address: user.address,
        phone: user.phone
    }
   try {
        await fetch(`http://localhost:3001/user/${id}`,
        {
        method: 'PATCH',
        body: JSON.stringify(envio),
        headers:{
            'Content-Type': 'application/json'
        },
        credentials: 'include'
        })
        swal("Success","Datos actualizados","success");
        history.push(`/user/panel/${id}`)
    } catch (error) {swal("error", "error al actualizar los datos, intente de nuevo", "error")            
    }
  }
  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Datos de Envio
      </Typography>
      <form onSubmit={handleSubmit}>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="firstName"
            name="firstName"
            label="Nombre"
            fullWidth
            autoComplete="given-name"
            value={user.firstName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="lastName"
            name="lastName"
            label="Apellido"
            fullWidth
            autoComplete="family-name"
            value={user.lastName}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            required
            id="address"
            name="address"
            label="Direccion"
            fullWidth
            autoComplete="shipping address-line1"
            value={user.address}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            id="address2"
            name="address2"
            label="Address line 2"
            fullWidth
            autoComplete="shipping address-line2"
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="city"
            name="city"
            label="Ciudad"
            fullWidth
            autoComplete="shipping address-level2"
            value={user.city}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField 
            id="province" 
            name="province" 
            label="Estado/Provincia/Region" 
            fullWidth
            onChange={handleChange}
            value={user.province}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="postalcode"
            name="postalcode"
            label="Codigo postal"
            fullWidth
            autoComplete="shipping postal-code"
            onChange={handleChange}
            value={user.postalcode}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <TextField
            required
            id="country"
            name="country"
            label="Pais"
            fullWidth
            autoComplete="shipping country"
            onChange={handleChange}
            value={user.country}
          />
        </Grid>
        <Grid item xs={12}>
          <FormControlLabel
            control={<Checkbox color="secondary" name="saveAddress" value="yes" />}
            label="Use this address for payment details"
          />
        </Grid>
      </Grid>
      </form>
    </React.Fragment>
  );
}