import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import Counter from '../Counter/Counter'
import { getProductsCart, deleteProductInCart, getUserProductsCart } from '../../../actions'
import { useDispatch, useSelector } from "react-redux";



export const Shopping = () => {
	const dispatch = useDispatch()
	// const products = useSelector(state => state.products)
	const userId = useSelector( state => state.userDetails)
	const cart = useSelector(state => state.cart)
	// console.log(object)
	useEffect(() => {
		dispatch(getUserProductsCart(userId.id))
		console.log(cart)
	}, [])
	
	return (
		<div>
			hola
			{cart && cart.length !== 0
				? cart.map((product) => (
					<div className='card mb-3 p-3' key={product.id}>
						<div className='row'>
							<div className='col-md-4'>
								<img
									src={`http://localhost:3001/images/${product.image[0]}`}
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
										{product.price}
									</p>
								</div>
							</div>
							<div className='col-md-3 d-flex align-items-center justify-content-center'>
								<Counter
									idProduct={product.id}
									quantity={
										product.order_product.quantity
									}
									userId={userId.id}
									stock={product.stock}
								/>
								<button
									className='btn btn-danger align-self-start'
									onClick={() => {
										deleteProductInCart(userId, product.id)
									}}
								>
									X
								</button>
							</div>
						</div>
					</div>
				))
				: null
			}
		</div>
	)
}

// const mapStateToProps = (store) => {
// 	return {
// 		products: store.cart,
// 	}
// }

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		getProductsCart: (userId) => dispatch(getProductsCart(userId)),
// 		deleteProductInCart: (userId, productId) =>
// 			dispatch(deleteProductInCart(userId, productId)),
// 	}
// }

export default Shopping