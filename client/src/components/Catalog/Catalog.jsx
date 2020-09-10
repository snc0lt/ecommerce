import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import Categorias from '../Categorias/Categorias'
import GridList from '../GridListProducts/GridListProducts'
import Grid from '@material-ui/core/Grid'
import { getProducts, getProductsBySearch } from "../../actions";

function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function () {
	const [productos, setProductos] = useState(null)
	const { id } = useParams()
	let query = useQuery().get('search');
	const products = useSelector(state => state.products)
	const dispatch = useDispatch()
	console.log(products)
	useEffect(() => {
		if (id) {
			
			fetch(`http://localhost:3001/category/${id}`)
				.then((res) => res.json())
				.then((data) => {
					setProductos(data)
				})
		}
		else if (query) {
			dispatch(getProductsBySearch(query))
			// setProductos(products)
			// fetch(`http://localhost:3001/products/?search=${query}`)
			// 	.then((res) => res.json())
			// 	.then((data) => setProductos(data))
		}
		else if (query === null) {
			// fetch('http://localhost:3001/products')
			// 	.then((res) => res.json())
			// 	.then((data) => {
			// 		setProductos(data)
			// 	})
			dispatch(getProducts())
			// setProductos(products)
			
		}
	}, [query, id])

	return (
		<Grid container direction='row'>
			<Grid item xs={12} sm={2} md={2}>
				<Categorias />
			</Grid>
			<Grid item xs={12} sm={10} md={10}>
				{
						products === null
						? <h2>no hay productos</h2>
						: <GridList productos={products} />
				}

			</Grid>

		</Grid>
	)
}
