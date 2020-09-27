import React from 'react'
import { useState } from 'react'
import { updateCountProductInCart } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";
import { handleGuestCount, handleGuestTotal } from '../../../actions'

export const Counter = ({ idProduct, quantity, userId, stock, gStock, precio, index }) => {
	const [count, setCount] = useState(1)
	const gCount = useSelector(state => state.guestCount)
	const logged = useSelector(state => state.userLogged)
	const dispatch = useDispatch()

	let mixStock=1;

	const handleCount = (e) => {
		const value = e.target.value
		if(stock){
			mixStock=stock
		}
		else if(gStock){
			mixStock=gStock
		}
		if (value < 1) {
			setCount(1)
			dispatch(updateCountProductInCart(userId, idProduct, count))
		} else if (value > mixStock) {
			setCount(mixStock)
			dispatch(updateCountProductInCart(userId, idProduct, count))
		} else {
			setCount(value)
			dispatch(updateCountProductInCart(userId, idProduct, value))
		}

		dispatch(handleGuestCount(value, index, gCount))
	}

	if (gStock) {
		let asd = []
		asd = JSON.parse(localStorage.getItem('total_guest-cart')) || []
	
		const asd2 = count * precio
		asd[index] = asd2
		localStorage.setItem('total_guest-cart', JSON.stringify(asd))
		dispatch(handleGuestTotal(asd))
	}

	return (
		<div className='d-flex flex-column justify-content-center align-items-center'>
			<label>Cantidad:</label>
			<input
				type='number'
				onChange={handleCount}
				value={count}
				className='w-75'
			/>
			{count >= stock || count >= gStock  ?
			<p>Stock maximo</p>
			: null}
			{logged
				? null
				: <div>
					<h5>$ {(count * precio).toFixed(2)}</h5>
				</div>}
		</div>
	)
}

export default Counter