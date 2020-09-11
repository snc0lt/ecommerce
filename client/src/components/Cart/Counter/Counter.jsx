import React from 'react'
import { useState } from 'react'
import { updateCountProductInCart } from '../../../actions'
import { useDispatch } from "react-redux";


export const Counter = ({ idProduct , quantity, userId, stock }) => {
	const [count, setCount] = useState(quantity)
	const dispatch = useDispatch()
	

	const handleCount = (e) => {
		const value = e.target.value

		if (value <= 1) {
			setCount(1)
			dispatch(updateCountProductInCart(userId, idProduct, count))
		} else if(value > stock) {
			setCount(stock)
			dispatch(updateCountProductInCart(userId, idProduct, value))
		} else {
			setCount(value)
			dispatch(updateCountProductInCart(userId, idProduct, value))
		}
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
		</div>
	)
}

export default Counter