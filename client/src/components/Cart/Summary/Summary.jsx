import React, { useState, useEffect } from 'react'
import { cleanGuestOrder } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from 'react-router-dom'
import { Button } from '@material-ui/core';

export const Summary = ({ total, orderId, suma }) => {
	const dispatch = useDispatch()
	const logged = useSelector(state => state.userLogged)
	const asd4 = useSelector(state => state.guestTotal)
	const [sum,setSum] = useState()
	const history = useHistory();
	
	const updateOrder = async (orderId, state) => {
		if (logged) {
			try {
				await fetch(`http://localhost:3001/orders/detail/${orderId}`, {
					method: 'PUT',
					body: JSON.stringify(state),
					headers: {
						'Content-Type': 'application/json'
					}
				})
			} catch (err) {console.log(err) }
			history.push('/user/addressform')
		} else if (!logged) {
			history.push('/user/login')
		}
	}
	const handleGuestLogin = () => {
		dispatch(cleanGuestOrder())
		history.push('/user/login')
	}

	useEffect(()=>{
		let suma = 0
		asd4 && asd4.map( t => suma = suma + t)
		setSum(suma)
	}
	,[asd4])
	
	
	
	
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
						{/* <button
							onClick={() => dispatch(cleanOrder(userId.id))}
							className='btn btn-danger ml-3'
						>
							Cancelar
					</button> */}
					</div>
				</>
				: <>
					<div>
						<h3>Resumen</h3>
						<hr />
						<p>Subtotal : $ {sum && sum}</p>
						<p>Impuestos : 12%</p>
						<hr />
						<h3>Total $ {(sum * 1.12).toFixed(2)}</h3>
						<hr />
						{/* <button className='btn btn-primary' onClick={() => updateOrder(orderId, { state: 'procesando' })}>Comprar</button>
						<button
							onClick={() => dispatch(cleanOrder(userId.id))}
							className='btn btn-danger ml-3'
						>
							Cancelar
					</button> */}
					</div>
					<h4>Logueate para seguir avanzado con tu compra..!</h4>
					{/* <Link to='/user/login'> */}
					<Button onClick={handleGuestLogin} color='primary' variant="outlined" >login</Button >
					{/* </Link> */}
				</>
		}
		</>

	)
}
export default Summary