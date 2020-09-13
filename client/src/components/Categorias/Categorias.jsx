import React, { useEffect} from 'react'
import { NavLink } from 'react-router-dom'
import { useLocation, Link } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import DeleteDialog from '../ConfirmationDialog/DeleteDialog'
import { Tooltip} from '@material-ui/core';
import IconButton from '@material-ui/core/IconButton';
import { useDispatch, useSelector } from "react-redux";
import { getCategories } from "../../actions";
export default function () {
	// const [categorias, setCategorias] = useState()
	const url = useLocation();
	const dispatch = useDispatch()
	const categories = useSelector(state => state.categories)
	console.log(categories)

	useEffect(() => {
		dispatch(getCategories())
		// fetch(`http://localhost:3001/category`)
		// 	.then(function (response) {
		// 		return response.json()
		// 	})
		// 	.then(function (category) {
		// 		setCategorias(category)
		// 	})
		// 	.catch(function (err) {
		// 		console.log(err)
		// 	})
	}, [])

	return (
		<div >
			<h3>Categorias</h3>
			<hr />
			<ul className='list-group'>
				{categories &&
					categories.map((c) => {
						if (url.pathname === '/admin/editCategory') {
							return (
								<div className='botones'>
							<NavLink
								to={`/products/category/${c.id}`}
								key={c.id}
								className='list-group-item list-group-item-action'
							>
								{c.name}
							</NavLink>
							<>
								<Link to={`/admin/editCategory/${c.id}`}>
								<IconButton>
									<Tooltip title='Editar categoria'>
									<EditIcon color='primary' />
									</Tooltip>
								</IconButton>
								</Link>

								<DeleteDialog categoria={c} />
						
							</>
						</div>
							)
						}
						else {
							return (
							<div className='botones'>
							<NavLink
								to={`/products/category/${c.id}`}
								key={c.id}
								className='list-group-item list-group-item-action'
							>
								{c.name}
							</NavLink>
							</div>
							)
						}
					}
					)}
			</ul>
		</div>
	)
}
