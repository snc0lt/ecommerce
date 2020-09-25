import React from 'react'
import NotFound from '../../testImages/OrdersNotFound.png'
import './OrdersNotFound.css'

export default function OrderNotFound(){
  return (
    <div className="OrderNotFound">
        <div className="imgContainer">
            <img src={NotFound} alt="No se encontraron órdenes" className="img"/>
        </div>
        <h6 className="text">No hemos encontrado lo que buscas</h6>
    </div>
  )
}

