import React from 'react'
import Shopping from './Shopping/Shopping'
import Summary from './Summary/Summary'
import Tooltip from '@material-ui/core/Tooltip'
import ShoppingCartOutlinedIcon from '@material-ui/icons/ShoppingCartOutlined';

export const Cart = () => {
	return (
		<div className='container p-5'>
            <Tooltip title='Shopping Cart'>
			<ShoppingCartOutlinedIcon/>	
            </Tooltip>			
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