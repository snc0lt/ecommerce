import React from 'react'
import { NavLink } from 'react-router-dom'

export default function ({ categorias }) {
	return (
		<div className='p-3'>
			<h1>Categorias</h1>
			<hr />
			<ul className='list-group'>
				{categorias &&
					categorias.map((c) => (
						<NavLink
							to={`/${c.name}`}
							key={c.id}
							className='list-group-item list-group-item-action'
						>
							{c.name}
						</NavLink>
					))}
			</ul>
		</div>
	)
}
