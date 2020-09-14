import React, { useState, useEffect } from 'react'
import Shopping from './Shopping/Shopping'
import Summary from './Summary/Summary'
import { useDispatch, useSelector } from "react-redux";
import { Card } from '@material-ui/core';


export const Cart = () => {

	const [total, setTotal] = useState()
	const cart = useSelector(state => state.cart)
	

	useEffect(() => {
		let sum=0
		for(let i of cart){
			sum=sum+(i.price * i.order_product.quantity)
		}
		setTotal(sum)
	 }, [cart])

	return (
		<> {cart && cart.length > 0 
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
					<Summary total={total} orderId={cart[0].order_product.orderId}/>
				</div>
			</div>
			<hr />
		</div>
		: <h3>Agrega productos a tu carrito</h3>
		}
		</>
	)
}