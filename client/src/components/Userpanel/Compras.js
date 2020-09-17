import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

const Compras = () => {
    const user = useSelector(state => state.user)
    const [order, Setorder] = useState(null);
    useEffect(() => {       
        fetch(`http://localhost.3001/order/${user.id}/completa`)
        .then(res => res.json())
        .then(data => Setorder(data))
        .catch(err => console.log(err))        
    }, [])
    return (
        <div>
          <h1>Mis Compras</h1>  
        </div>
    )
}

export default Compras
