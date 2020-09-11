import React, { useState, useEffect } from 'react'
//import { cancelOrder } from '../../../actions'



export const Summary = () => {
	return (
		<div>
			<h3>Resumen</h3>
			<hr />
			<p>Subtotal : $...</p>
			<p>Impuestos : $...</p>
			<hr />
			{/* <h3>Total $ {total}</h3> */}
			<hr />
			<button className='btn btn-primary'>Finalizar compra</button>
			<button
				// onClick={() => cancelOrder(1)}
				className='btn btn-danger ml-3'
			>
				Cancelar
			</button>
		</div>
	)
}
export default Summary