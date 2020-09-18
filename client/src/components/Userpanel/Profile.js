import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import {setUser, getUserDetail} from '../../actions'
import { useParams, useHistory } from 'react-router-dom';
import swal from 'sweetalert';

const Profile = () => {
    const dispatch = useDispatch()
    const history = useHistory()
    const [user,Setuser] = useState('')
    const [dir,Setdir] = useState(user.address)
    const [phone,SetPhone] = useState(user.phone)
    const { id } = useParams()

    useEffect(() => {
        fetch(`http://localhost:3001/user/${id}`)
        .then(res=>res.json())
        .then(data=> {
            Setdir(data.address);
            SetPhone(data.phone);
            Setuser(data);
            dispatch(setUser(data))
        })
    }, [])

    const handleChangeDir = (e) => {
        Setdir(e.target.value)
    }
    const handleChangePhone = (e) => {
        SetPhone(e.target.value)
    }
    const handleSubmit = async function (e) {
        e.preventDefault()
        const envio = {
            address : dir,
            phone: phone
        }
       try {
            const fetchdata = await fetch(`http://localhost:3001/user/${id}`,
            {
            method: 'PATCH',
            body: JSON.stringify(envio),
            headers:{
                'Content-Type': 'application/json'
            }
            })  
            swal("Success","Datos actualizados","success");
            history.push(`/user/panel/${id}`)                   
        } catch (error) {swal("error", "error al actualizar los datos, intente de nuevo", "error")            
        }               
      }
    
    return (user && <div>
        <h1>Mi perfil</h1>
    <h3>Tu nombre: {user.firstName} {user.lastName}</h3>
    <h3>Tu mail: {user.email}</h3>
    {user.address && user.address.length > 0 ? <h3> Tu dirección : {user.address}</h3> : null}
    {user.phone && user.phone.length > 0 ? <h3> Tu teléfono : {user.phone}</h3> : null}
    <h3>Edita dirección y teléfono</h3>

            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Dirección"
                value={dir}
                multiline
                variant="outlined"
                onChange={handleChangeDir}
                required
                name='dirección'
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="outlined-textarea"
                label="Teléfono"
                value={phone}
                multiline
                variant="outlined"
                onChange={handleChangePhone}
                required
                name='teléfono'
              />
            </Grid>
            <Button onClick={handleSubmit}
            disabled = { !dir || !phone}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
          >
            Actualizar datos
          </Button>

    </div>       
    )
}

export default Profile
