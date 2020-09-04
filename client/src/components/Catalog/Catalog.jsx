import React, { useState, useEffect } from 'react'
import Categorias from '../Categorias/Categorias'
import ProductsCards from '../Products/ProductCard'

export default function ({ match, location }) {
	const [categorias, setCategorias] = useState([])
	const [productos, setProductos] = useState([])
	const searchProduct = location.search
	const nameCategory = match.params.name

	useEffect(() => {
		if (nameCategory) {
			fetch(`http://localhost:3001/category/${nameCategory}`)
				.then((res) => res.json())
				.then(({ products }) => setProductos(products))
		} else if (searchProduct) {
			fetch(`http://localhost:3001/product${searchProduct}`)
				.then((res) => res.json())
				.then((data) => setProductos(data))
		} else {
			fetch('http://localhost:3001/product')
				.then((res) => res.json())
				.then((data) => setProductos(data))
		}
	}, [nameCategory, searchProduct])

	useEffect(() => {
		fetch(`http://localhost:3001/category`)
			.then(function (response) {
				return response.json()
			})
			.then(function (category) {
				setCategorias(category)
			})
			.catch(function (err) {
				console.log(err)
			})
	}, [])

	return (
		<div className='container-fluid h-100 p-4 bg-secondary'>
			<div className='row h-100'>
				<div className='col-3 bg-light'>
					<Categorias categorias={categorias} />
				</div>
				<div className='col-9'>
					<ProductsCards productos={productos} />
				</div>
			</div>
		</div>
	)
}
