import React, { useState, useEffect } from 'react'
import { cleanOrder } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";



export const Summary = ({ total }) => {
	const dispatch = useDispatch()
	const userId = useSelector( state => state.userDetails)
	return (
		<div>
			<h3>Resumen</h3>
			<hr />
			<p>Subtotal : $..{total}</p>
			<p>Impuestos : 12%</p>
			<hr />
			<h3>Total $ {total * 1.12}</h3>
			<hr />
			<button className='btn btn-primary'>Finalizar compra</button>
			<button
				onClick={() => dispatch(cleanOrder(userId.id))}
				className='btn btn-danger ml-3'
			>
				Cancelar
			</button>
		</div>
	)
}
export default Summary