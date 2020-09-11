import React, { useState } from 'react'
import Shopping from './Shopping/Shopping'
import Summary from './Summary/Summary'
import { useDispatch, useSelector } from "react-redux";


export const Cart = () => {

	const [total, setTotal] = useState()
	const cart = useSelector(state => state.cart)
	console.log(cart)

	// useEffect(() => {
	// 	if (productCart) {
	// 		const totalProducts = productCart.map(prod => 
	// 			// prod.price * prod.order_product.quantity
	// 			prod.map(p => p.price * p.order_product.quantity)
					
	// 			)
	// 			setTotal(totalProducts)
	// 	}
	// }, [])
	

	return (
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
					<Summary />
				</div>
			</div>
			<hr />
		</div>
	)
}