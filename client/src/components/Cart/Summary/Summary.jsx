import React, { useState, useEffect } from 'react'
import { cleanOrder } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";
import {Link, useHistory} from 'react-router-dom'

export const Summary = ({ total, orderId }) => {
	const dispatch = useDispatch()
	const userId = useSelector( state => state.userDetails)
	const history = useHistory();

	const updateOrder = async (orderId, state) => {
		try {
			const data = await fetch(`http://localhost:3001/orders/detail/${orderId}`, {
				method: 'PUT',
				body: JSON.stringify(state),
				headers: {
					'Content-Type': 'application/json'
				}
			})
			console.log(data)
		} catch (err) {console.log(err)}
		history.push('/user/checkout')
	}

	return (
		<div>
			<h3>Resumen</h3>
			<hr />
			<p>Subtotal : $ {total}</p>
			<p>Impuestos : 12%</p>
			<hr />
			<h3>Total $ {(total * 1.12).toFixed(2)}</h3>
			<hr />
			<button className='btn btn-primary' onClick={() => updateOrder(orderId, {state: 'procesando'})}>Comprar</button>
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