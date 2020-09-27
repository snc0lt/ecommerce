import React, { useState, useEffect } from 'react';
import "../StyleForm.css"
import { Grid, Button, TextField } from '@material-ui/core';
import swal from 'sweetalert';
import { useHistory } from "react-router-dom";

export default function EditCategory({ match }){
    let name = match.params.name
    const history = useHistory();
    const [input, setInput] = useState({
            name: '',
            description: ''
    });

    const handleInputChange = (e)=>{
            setInput({
                ...input,
                [e.target.name]: e.target.value
            })
    };

    useEffect( () => {
        if(name){
        fetch(`http://localhost:3001/category/single/${name}`)
        .then(response => response.json())
        .then(function(category){
        setInput(
            category
            );
        })
        .catch(function(err){
        swal("Error","categoria no encontrada","error")
        });
    }},[name]);

    const updateCategory = async function(){
        await fetch(`http://localhost:3001/category/${input.id}`, {
            method: "PUT",
            body: JSON.stringify(input),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            swal("Success","Categoria modificada","success")
        }).catch(err => alert(err));
        history.push('/admin/editCategory')
    };

    const deletedCat = async function(){
        swal("Success","categoria eliminada","success");
        await fetch(`http://localhost:3001/category/${input.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })

        .catch(err => alert(err));
        history.push('/admin/editCategory')
    };

return(
    <div>
        <h3> Editar Categoria</h3>
        <hr/>
        <Grid item xs={12}>
            <TextField               
            fullWidth           
            label="Nombre"
            value={input.name}
            multiline
            variant="outlined"
            onChange={handleInputChange}
            required
            name='name'
            />
        </Grid>
        <hr/>
        <Grid item xs={12}>
            <TextField               
            fullWidth         
            label="Descripción"
            value={input.description}
            multiline
            variant="outlined"
            onChange={handleInputChange}
            required
            name='description'
            />
        </Grid>
        <hr/>   
        <Button onClick={deletedCat}
        variant='contained'
        color = 'secondary' >Eliminar Categoria</Button>
        <hr/>   
        <Button onClick={updateCategory}
        variant='contained'
        color = 'primary'
        disabled = {!input.name || !input.description}
        >Modificar categoria</Button>              
    </div>
)
};