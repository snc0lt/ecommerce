import React, { useState, useEffect } from 'react'
import Shopping from './Shopping/Shopping'
import Summary from './Summary/Summary'
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from './EmptyCart';
import { getUserProductsCart } from '../../actions'


export const Cart = () => {

	const [total, setTotal] = useState()
	const [gtotal, setGTotal] = useState()
	const cart = useSelector(state => state.cart)
	const gCount = useSelector(state => state.guestCount)
	const guestCart = useSelector(state => state.guestCart)
	const dispatch = useDispatch()
	const userId = useSelector(state => state.userDetails)
	// const logged = useSelector(state => state.userLogged)
	
	useEffect(() => {
		let sum = 0
		for (let i of cart) {
			sum = sum + (i.price * i.order_product.quantity)
		}
		setTotal(sum)
		if (userId) {
			dispatch(getUserProductsCart(userId.id))
		}
	}, [cart, total,dispatch,userId])

	// useEffect(() => {
	// 	if (userId) {
	// 		dispatch(getUserProductsCart(userId.id))
	// 	}
	// }, [total])

	useEffect(()=>{
		let sum = 0
		if (gCount && guestCart) {
			guestCart.map((g, i) =>  {
				sum = sum + (gCount[i] * g.price)
				return sum
			})
			setGTotal(sum)
		}
	}, [gCount])


	return (
		<> {cart && cart.length > 0 && userId
			?
			<div className='container p-5'>
				<hr />
				<div className='row container ml-auto mr-auto'>
					<div
						className='col-lg-8'
						style={{ maxHeight: '500px', overflow: 'scroll' }}
					>
						<Shopping />
					</div>
					<div className='col-lg-4'>
						<Summary total={total} orderId={cart[0].order_product.orderId} />
					</div>
				</div>
				<hr />
			</div>
			: guestCart && guestCart.length > 0
				? <div className='container p-5'>
					<hr />
					<div className='row container ml-auto mr-auto'>
						<div
							className='col-lg-8'
							style={{ maxHeight: '500px', overflow: 'scroll' }}
						>
							<Shopping guestCart={guestCart} />
						</div>
						<div className='col-lg-4'>
							<Summary suma={gtotal} />
						</div>
					</div>
					<hr />
				</div>
				: <EmptyCart />
		}
		</>
	)
}