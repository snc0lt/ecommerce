import React, { useState, useEffect } from 'react';
import "../StyleForm.css"

export default function EditCategory({ match }){
    let id = match.params.idCategory;
    let name = match.params.name
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

    useEffect( () => {
        if(name){
        fetch(`http://localhost:3001/category/${name}`)
        .then(response => response.json())
        .then(function(category){
        setInput(
            category
            );
        })
        .catch(function(err){
           alert("categoria no encontrada")
        });
    }},[name]);

    

    const createCategory = ()=>{
        fetch('http://localhost:3001/category', {
            method: 'POST',
            body: JSON.stringify(input),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(()=>{
            alert(`Categoria creada con exito`)
            resetForm();
        }).catch()
    };

    const updateCategory = ()=>{
        fetch(`http://localhost:3001/category/${input.id}`, {
            method: "PUT",
            body: JSON.stringify(input),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
        .then(() => {
            alert('Categoria modificada')
            resetForm();
        }).catch(err => alert(err));
    };

    const deletedCat = function(){
        alert('categoria eliminada');
        fetch(`http://localhost:3001/category/${input.id}`, {
            method: "DELETE",
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
              }
        })

        .catch(err => alert(err));
        resetForm();
    };

    const handleSubmit = (e)=>{
        e.preventDefault();
       createCategory()
    };




        return(

            <div  className="formStyle">

             <h3> Editar Categoria</h3>

                <hr/>

                <form onSubmit= {handleSubmit }>

                <div id="closeIcon" className="row">
                    <button onClick={deletedCat} className="btn btn-sm btn-danger">Eliminar Categoria</button>
                </div>

                    <div className="inputContainer">
                        <label>Nombre: </label>
                        <input type="text" name="name" onChange={handleInputChange} value={input.name} required autoFocus/>
                    </div>
                    <div className="inputContainer">
                        <label>Descripcion: </label>
                        <textarea name="description" onChange={handleInputChange} value={input.description} required />
                    </div>

                    <div className="modal-footer">
                        <button onClick={resetForm} className="button"> Resetear </button>

                       <input  type="button" onClick={updateCategory} value="Modificar categoria" className="button"/>}
                    </div>
                </form>

            </div>
        )
    };
