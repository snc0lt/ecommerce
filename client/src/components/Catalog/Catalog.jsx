import React, { useState, useEffect } from 'react'
import { useLocation, useParams } from "react-router-dom";
import Categorias from '../Categorias/Categorias'
import GridList from '../GridListProducts/GridListProducts'
import Grid from '@material-ui/core/Grid'


function useQuery() {
	return new URLSearchParams(useLocation().search);
}

export default function () {
	const [productos, setProductos] = useState(null)
	const { id } = useParams()
	let query = useQuery().get('search');

	useEffect(() => {
		if (id) {
			fetch(`http://localhost:3001/category/${id}`)
				.then((res) => res.json())
				.then((data) => {
					setProductos(data)
				})
		}
		else if (query) {
			fetch(`http://localhost:3001/products/?search=${query}`)
				.then((res) => res.json())
				.then((data) => setProductos(data))
		}
		else if (query === null) {
			fetch('http://localhost:3001/products')
				.then((res) => res.json())
				.then((data) => {
					setProductos(data)
				})
		}
	}, [query, id, productos])

	return (
		<Grid container direction='row'>
			<Grid item xs={12} sm={2} md={2}>
				<Categorias />
			</Grid>
			<Grid item xs={12} sm={10} md={10}>
				{
						productos === null
						? <h2>no hay productos</h2>
						: <GridList productos={productos} />
				}
			</Grid>
		</Grid>
	)
}
