import React, { useState } from 'react'
//import { useHistory } from 'react-router-dom'
import './SearchBar.css';


export default function SearchBar(props) {
	const [productSearch, setProductSearch] = useState('');
    //const history = useHistory();
	const handleSubmit = (e) => {
        e.preventDefault();
        props.search(productSearch);
		//history.push(`/?search=${productSearch}`);
	};

	return (
		<form onSubmit={handleSubmit}>
			<input
				className='bar'
				type='text'
				placeholder='Buscar productos ...'
				value={productSearch}
				onChange={(e) => setProductSearch(e.target.value)}
			/>

			<button
				className="submit"
                type='search'
                //esto desabilita el botón cuando no hay texto en el campo de búsqueda
				disabled= {productSearch.trim().length === 0? true: false}
			>
				Buscar
			</button>
		</form>
	)
}