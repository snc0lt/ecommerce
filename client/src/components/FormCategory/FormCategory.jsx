import React, { useState } from 'react';
import "../StyleForm.css"

export default function FormCategory({ match }){
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
    const resetForm = ()=> {
        setInput({
            name: '',
            description: ''
        })
    };
    const handleSubmit = (e)=>{
        e.preventDefault();
        const newCategory = { name: input.name, description: input.description}
        fetch('http://localhost:3001/category', {
            method: 'POST',
            body: JSON.stringify(newCategory),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })
        .then(()=>{
            alert(`Se ha creado una nueva Categoria exitosamente`)
            resetForm();
        })
        .catch((err)=>{
             console.log(err)
        })
    }

    return(
        <div  className="formStyle">
            <h3>Formulario para crear categoria</h3>
            <hr/>
            <form onSubmit= {handleSubmit }>
                <div className="inputContainer">
                    <label>Nombre de Categoria: </label>
                    <input type="text" name="name" onChange={handleInputChange} value={input.name} required autoFocus/>
                </div>
                <div className="inputContainer">
                    <label>Descripcion: </label>
                    <textarea name="description" onChange={handleInputChange} value={input.description} required />
                </div>

                <div className="buttonContainer">
                    <button onClick={resetForm} className="button"> Cancelar </button>
                    <input  type="submit" value="Guardar" className="button"/>
                </div>
            </form>
        </div>
    )
}
