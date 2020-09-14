import React, { useState, useEffect } from 'react'
import { cleanOrder } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";
import { Link, useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';

export const Summary = ({ total, orderId }) => {
	const dispatch = useDispatch()
	const userId = useSelector(state => state.userDetails)
	const logged = useSelector(state => state.userLogged)
	const history = useHistory();

	const updateOrder = async (orderId, state) => {
		if (logged) {
			try {
				const data = await fetch(`http://localhost:3001/orders/detail/${orderId}`, {
					method: 'PUT',
					body: JSON.stringify(state),
					headers: {
						'Content-Type': 'application/json'
					}
				})
				console.log(data)
			} catch (err) { console.log(err) }
			history.push('/user/checkout')
		} else if (!logged) {
			history.push('/user/login')
		}
	}

	return (
		<>{
			logged
				? <>
					<div>
						<h3>Resumen</h3>
						<hr />
						<p>Subtotal : $ {total}</p>
						<p>Impuestos : 12%</p>
						<hr />
						<h3>Total $ {(total * 1.12).toFixed(2)}</h3>
						<hr />
						<button className='btn btn-primary' onClick={() => updateOrder(orderId, { state: 'procesando' })}>Comprar</button>
						<button
							onClick={() => dispatch(cleanOrder(userId.id))}
							className='btn btn-danger ml-3'
						>
							Cancelar
					</button>
					</div>
				</>
				: <>
					<h4>Logueate para seguir avanzado con tu compra..!</h4>
					<Link to='/user/login'>
						<Button color='primary' variant="outlined" >login</Button >
					</Link>
				</>
		}
		</>

	)
}
export default Summary