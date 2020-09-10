import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Counter from '../Counter/Counter'
import { getProductsCart, deleteProductInCart } from '../../../actions'

export const Shopping = ({
	products,
	getProductsCart,
	deleteProductInCart,
}) => {
	useEffect(() => {
		getProductsCart(1)
	}, [])
	return (
		<div>
			{products.length === 0
				? null
				: products.map((product) => (
						<div className='card mb-3 p-3' key={product.id}>
							<div className='row'>
								<div className='col-md-4'>
									<img
										src={product.image}
										className='card-img'
										alt='...'
									/>
								</div>
								<div className='col-md-5'>
									<div className='card-body'>
										<h5 className='card-title'>
											{product.name}
										</h5>
										<p className='card-text'>
											{product.description.slice(0, 50) +
												'...'}
										</p>
									</div>
								</div>
								<div className='col-md-3 d-flex align-items-center justify-content-center'>
									<Counter
										idProduct={product.id}
										quantity={
											product.order_product.quantity
										}
									/>
									<button
										className='btn btn-danger align-self-start'
										onClick={() => {
											deleteProductInCart(1, product.id)
										}}
									>
										X
									</button>
								</div>
							</div>
						</div>
				  ))}
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
		getProductsCart: (userId) => dispatch(getProductsCart(userId)),
		deleteProductInCart: (userId, productId) =>
			dispatch(deleteProductInCart(userId, productId)),
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Shopping)