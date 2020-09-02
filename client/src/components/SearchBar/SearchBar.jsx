import React, { useState } from 'react'
import { useHistory } from 'react-router-dom'
import './SearchBar.css';

export default function SearchBar() {
	const [productSearch, setProductSearch] = useState('')
	const history = useHistory()
	const handleSubmit = (e) => {
		e.preventDefault()
		history.push(`/?search=${productSearch}`)
	}

	return (
		<form onSubmit={handleSubmit} className='form-inline'>
			<input
				className='form-control mr-2'
				style={customInput}
				type='text'
				placeholder='Ingrese un producto ...'
				value={productSearch}
				onChange={(e) => setProductSearch(e.target.value)}
			/>

			<button
				className="btn btn-outline-info my-2 my-sm-0"
				type='search'
				disabled= {productSearch.trim().length === 0? true: false}
			>
				Buscar
			</button>
		</form>
	)
}