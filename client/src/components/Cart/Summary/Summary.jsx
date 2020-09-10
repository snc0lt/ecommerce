import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { cancelOrder } from '../../../actions'

export const Summary = ({ products, cancelOrder }) => {
	const [total, setTotal] = useState(0)

	useEffect(() => {
		if (products) {
			const totalProducts = products.reduce(
				(acc, el) =>
					acc + el.order_product.price * el.order_product.quantity,
				0
			)
			setTotal(totalProducts)
		}
	}, [products])

	return (
		<div>
			<h3>Resumen</h3>
			<hr />
			<p>Subtotal : $...</p>
			<p>Impuestos : $...</p>
			<hr />
			<h3>Total $ {total}</h3>
			<hr />
			<button className='btn btn-primary'>Finalizar compra</button>
			<button
				onClick={() => cancelOrder(1)}
				className='btn btn-danger ml-3'
			>
				Cancelar
			</button>
		</div>
	)
}

const mapStateToProps = (store) => {
	return {
		products: store.cart,
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		cancelOrder: (idUser) => dispatch(cancelOrder(idUser)),
	}
}
export default connect(mapStateToProps, mapDispatchToProps)(Summary)
