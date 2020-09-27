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

	useEffect(() => {
		dispatch(getCategories())	
	// }, [categories])
	}, [dispatch])

	useEffect(() => {
		if(url.pathname === '/admin/editcategoy') {
			dispatch(getCategories())
		}
	}, [categories,url.pathname,dispatch])

	return (
		<div >
			<h3>Categorias</h3>
			<hr />
			<ul className='list-group'>
				{categories &&
					categories.map((c) => {
						if (url.pathname === '/admin/editCategory') {
							return (
								<div className='botones' key={c.id}>
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
							<div className='botones' key={c.id}>
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
