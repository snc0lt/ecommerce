import React, { useState, useEffect } from 'react'
import Categorias from '../Categorias/Categorias'
import ProductsCards from '../Products/ProductCard'
import GridList from '../GridListProducts/GridListProducts'
import Grid from '@material-ui/core/Grid'

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
			fetch('http://localhost:3001/products')
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
		<Grid className='container-fluid h-100 p-4 bg-secondary' container direction='row'>
			{/* <div className='row h-100'> */}
				<Grid item xs={12} sm={4} md={4}>
					<Categorias categorias={categorias} />
				</Grid>
				<Grid item xs={12} sm={8} md={8}>
					<GridList productos={productos}/>
				</Grid>
			{/* </div> */}
		</Grid>
	)
}
