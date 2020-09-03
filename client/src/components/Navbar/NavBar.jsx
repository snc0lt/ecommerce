import React from 'react'

import SearchBar from '../SearchBar/SearchBar'
//import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
//import { connect } from 'react-redux'
//import { userLogout } from '../../actions'



export default function NavBar() {
	return (
		<nav className='navbar navbar-dark bg-dark p-4 mb-3'>
			<SearchBar />
		</nav>
	)
}

// const mapStateToProps = (state) => ({
// 	user: state.userLogged,
// })

// const mapDispatchToProps = (dispatch) => {
// 	return {
// 		userLogout: () => dispatch(userLogout()),
// 	}
// }
// export default connect(mapStateToProps, mapDispatchToProps)(NavBar)
