import React from 'react'
import Shopping from './Shopping/Shopping'
import Summary from './Summary/Summary'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

export const Cart = () => {
	return (
		<div className='container p-5'>
			<h1>
				<FontAwesomeIcon
					icon={['fas', 'shopping-cart']}
					style={{ marginRight: '20px' }}
				/>
				Carrito de compras
			</h1>
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
