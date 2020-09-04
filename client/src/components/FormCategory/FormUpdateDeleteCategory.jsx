import React, { useState, useEffect } from 'react';
import "../StyleForm.css"

export default function FormCategory({ match }){
   let id = match.params.idCategory;
   const [input, setInput] = useState({
    name: '',
    description: ''
});

useEffect( () => {
    if(id){
    fetch(`http://localhost:3001/category/${id}`)
    .then(function(response){
        return response.json()
    })
    .then(function(category){
      setInput({
        ...input,
        name: category.name,
        description: category.description
    });
    })
    .catch(function(err){
        console.log(err)
    });
}},[]);

const handleInputChange = (e)=>{
    setInput({
        ...input,
        [e.target.name]: e.target.value
    })
}

const resetForm = () => {
    setInput({ name: '',  description: ''})
};

const handleSubmit = (e)=> {
    e.preventDefault();
    const newCategory = {
        name: input.name,
        description: input.description
    };
        updateCategory(newCategory)
}

const updateCategory = (newCategory)=>{

    fetch(`http://localhost:3001/category/${id}`, {
        method: "PUT",
        body: JSON.stringify(newCategory),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    .then((res) => res.json)
    .then(() => {
       alert('categoria editada')
        resetForm();
      })
    .catch((err) => {
        console.log(err)
    });
}

const deletedCat = function(){
    alert('categoria eliminida');

    fetch(`http://localhost:3001/category/${id}`, {
        method: "DELETE",
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          }
    })
    .then()
    .catch(err  => {
        console.log(err)
    });
    resetForm();
}



    return(
        <div key={id} className="formStyle">
            <h3>Categoria</h3>
            <hr/>
            <div id="closeIcon" className="row">
            <button onClick={deletedCat} className="btn btn-sm btn-danger">Eliminar Categoria</button>
            </div>
            <form onSubmit= {handleSubmit}>
                <div className="inputContainer">
                    <label>Nombre: </label>
                    <input type="text" name="name" onChange={handleInputChange} value={input.name} required />
                </div>
                <div className="inputContainer">
                    <label>Descripcion: </label>
                    <textarea name="description" onChange={handleInputChange} value={input.description} required />
                </div>

                <div className="buttonContainer">
                    <button onClick={resetForm} className="button"> cancelar </button>
                    <input  type="submit" value="Modificar" className="button" />
                </div>
            </form>
        </div>
    )
}
