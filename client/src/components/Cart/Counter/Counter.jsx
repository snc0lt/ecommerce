import React from 'react'
import { connect } from 'react-redux'
import { useState } from 'react'
import { updateCountProductInCart } from '../../../actions'

export const Counter = ({ idProduct, updateQuantity, quantity }) => {
	const [count, setCount] = useState(quantity)
	const handleCount = (e) => {
		const value = e.target.value

		if (value <= 1) {
			updateQuantity(1, idProduct, 1)
			setCount(1)
		} else {
			updateQuantity(1, idProduct, value)
			setCount(value)
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

const mapDispatchToProps = (dispatch) => {
	return {
		updateQuantity: (userId, idProduct, count) =>
			dispatch(updateCountProductInCart(userId, idProduct, count)),
	}
}

export default connect(null, mapDispatchToProps)(Counter)