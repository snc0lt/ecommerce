import swal from 'sweetalert';

export const getProducts = () => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/products')
		const res = await data.json()
		dispatch({
			type: 'SET_PRODUCTS',
			payload: res
		})
	} catch (err) {
		console.log(err)
	}

}

export const getProductsByCategory = (id) => dispatch => {
	try {
		fetch(`http://localhost:3001/category/${id}`)
			.then((data) => data.json())
			.then((res) => {
				dispatch({
					type: 'SET_PRODUCTS',
					payload: res
				})
			})
	} catch (err) {
		console.log(err)
	}

}

export const getProductsBySearch = (query) => dispatch => {
	try {
		fetch(`http://localhost:3001/products/?search=${query}`)
			.then(data => data.json())
			.then(res => {
				dispatch({
					type: 'SET_PRODUCTS',
					payload: res
				})
			})
	} catch (err) {
		console.log(err)
	}

}

export const getProductDetail = (id) => dispatch => {
	try {
		fetch(`http://localhost:3001/products/${id}`)
			.then(data => data.json())
			.then(res => {
				dispatch({
					type: 'GET_PRODUCT_DETAIL',
					payload: res
				})
			})
	} catch (err) {
		console.log(err)
	}
}

export const createProduct = (producto, msg) => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/products', {
			method: 'POST',
			body: JSON.stringify(producto),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const res = await data.json()
		
		dispatch({
			type: 'CREATE_PRODUCT',
			payload: res.product,
		})
		msg(res.msg)
	} catch (error) {
		console.log(error)
		alert('something went wrong..!')
	}
}


export const removeProduct = (id) => dispatch => {
	try {
		fetch(`http://localhost:3001/products/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		dispatch({
			type: 'REMOVE_PRODUCT',
			payload: id
		})
	} catch (err) {
		console.log(err)
	}
	
}


export const getCategories = () => dispatch => {

	try {

		fetch(`http://localhost:3001/category`)
			.then(data => data.json())
			.then(res => {
				dispatch({
					type: 'GET_CATEGORIES',
					payload: res
				})
			})
			.catch(err => console.log(err))

	} catch (err) {
		console.log(err)
	}

}

export const addCategory = (category) => async dispatch => {
	try {
		const data = await fetch('http://localhost:3001/category', {
			method: 'POST',
			body: JSON.stringify(category),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		const res = await data.json()
		if(res.status === 400) {
			swal("Opps!", "la categoria ya existe!", "error")
		} else if (res.status === 201){
			dispatch({
				type: 'ADD_CATEGORY',
				payload: res.newCategory
			})
			 swal("Genial!", "Se ha creado la categoria exitosamente!", "success")
		} else {
			swal("Opps!", "algo salio mal, vuelve a intertarlo!", "error")
		}
	
	} catch (err) {
		console.log(err)
	}	
}

export const removeCategory = (id) => dispatch => {
	try {
		fetch(`http://localhost:3001/category/${id}`, {
			method: 'DELETE',
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		dispatch({
			type: 'REMOVE_CATEGORY',
			payload: id
		})
	} catch (err) {
		console.log(err)
	}
	
}

export const getUsers = () => dispatch =>{
	try {
		fetch('http://localhost:3001/user', { credentials: 'include' })
		.then((res) => res.json())
		.then((users) =>
			dispatch({
				type: 'GET_USERS',
				payload: users,
			})
		)
		.catch((error) => { console.log(error) })
	} catch (err) {
		console.log(err)
}}

export function getUserDetail(id) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${id}`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((user) =>
				dispatch({
					type: 'GET_USER_DETAIL',
					payload: user,
				})
			)
	}
}



export const setUser = (user) => dispatch => {
	dispatch({
		type: 'SET_USER',
		payload: user
	})
}
export const setUserSign = (user) => dispatch => {
	dispatch({
		type: 'ADD_USER',
		payload: user
	})
}

export function userLogin(input, history) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/login`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(input),
		})
			.then((res) => res.json())
			.then((response) => {
				if (response.error && response.message === 'usuario o password no valido') {
					swal("Ups!", "Error en el inicio de sesion", "error")
				}
				else if (response.status === 200) {
					localStorage.setItem('user', JSON.stringify(response.user))
					dispatch({
						type: 'USER_LOGGED',
						payload: response.user,
					})
					swal("Success", "Usuario logueado con exito", "success")
					history.push('/')
				}
			})
			.catch((error) => {
				return { error: true, message: 'Error en login, intente otra vez' }
			})
	}
}

export function removeUser(id) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${id}`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((user) => {
				dispatch({
					type: 'REMOVE_USER',
					payload: user.id,
				})
				alert('Cuenta de usuario eliminada', '', 'success')
			})
			.catch((err) => console.log(err))
	}
}

export const getUserProductsCart = (userId) => dispatch => {

	try {
		fetch(`http://localhost:3001/user/${userId}/cart`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((order) =>
				order.length === 0 || !order
					? dispatch({
						type: 'GET_PRODUCTS_IN_CART',
						payload: [],
					})
					: dispatch({
						type: 'GET_PRODUCTS_IN_CART',
						payload: order[0].products,
					})
			)
	} catch (err) {
		console.log(err)
	}
	
}

export function deleteProductInCart(userId, idProduct) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${userId}/cart`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productId: idProduct }),
		})
			.then((res) => res.json())
			.then((product) => {
				console.log('borraste es producto..!')
				dispatch({
					type: 'DELETE_PRODUCT_CART',
					payload: product.productId,
				})
			})
	}
}

export const updateCountProductInCart = (userId, idProduct, count) => dispatch => {
	try {
		fetch(`http://localhost:3001/user/${userId}/cart`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productId: idProduct, quantity: count }),
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({
					type: 'UPDATE_COUNT_PRODUCT',
					payload: data.products,
				})
			})
			.catch(console.log)
	} catch (err) {
		console.log(err)
	}
	
}

export function addProductCart(idUser, idProduct, priceProduct) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${idUser}/cart`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ productId: idProduct, price: priceProduct }),
		})
			.then((res) => res.json())
			.then((data) => {
				dispatch({
					type: 'ADD_PRODUCT_IN_CART',
					payload: data.products,
				})
			})
	}
}

export const setGuestCart = (guest) => dispatch => {
	dispatch({
		type: 'SET_GUEST_CART',
		payload: guest
	})
}

export const addProductToGuestCart = (guestCart) => dispatch => {
	let gCart = []
	gCart = JSON.parse(localStorage.getItem('guest_cart')) || []
	gCart.push(guestCart)

	localStorage.setItem('guest_cart', JSON.stringify(gCart))
	dispatch({
		type: 'ADD_PRODUCT_IN_GUEST_CART',
		payload: guestCart
	})
}

export const removeGuestItem = (index) => dispatch =>  {
	let gCart = []
	gCart = JSON.parse(localStorage.getItem('guest_cart')) || []
	// gCart.slice(index, 1)
	const newGuest = gCart.filter(g => g.id !== index)
	
	localStorage.setItem('guest_cart', JSON.stringify(newGuest))
	dispatch({
		type: 'REMOVE_GUEST_ITEM',
		payload: newGuest
	})
}

export const cleanGuestOrder = () => dispatch => {
	dispatch({
		type: 'CLEAN_GUEST_CART'
	})
}

export const cleanOrder = () => dispatch => {
	dispatch({
		type: 'CLEAN_ORDER'
	})
	// try {
	// 	fetch(`http://localhost:3001/user/${idUser}/cart`, {
	// 		method: 'DELETE',
	// 		credentials: 'include',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	}).then((res) =>
	// 		res.status === 200
	// 			? dispatch({
	// 				type: 'CLEAN_ORDER',
	// 			})
	// 			: alert('Error al cancelar la orden', '', 'error')
	// 	)
	// } catch (err) {
	// 	console.log(err)
	// }

	
}

export function getClosedOrders() {
	return function (dispatch) {
		return fetch('http://localhost:3001/orders/admin?search=completa', {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((closedOrders) =>
				dispatch({
					type: 'GET_CLOSED_ORDERS',
					payload: closedOrders,
				})
			)
	}
}

export const promoteToAdmin = (id,estado) => {
	try {
		fetch(`http://localhost:3001/admin/promote/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ isAdmin: estado })
		})
			.then(estado
				? swal('Usuario Promovido a Admin', '', 'success')
			    : swal('Usuario Revocado de Admin', '', 'success'))
			.catch((err) => console.log(err));	
	} catch (err) {
		console.log(err)
}
}


export const addUser = (user) => dispatch => {
	try {
		fetch('http://localhost:3001/user', {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify(user),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then(data => data.json())
			.then(res => {
				if (res.status === 400) {
					swal("Ups!", "El email ya esta siendo utilizado", "error")
				} else if (res.status === 201) {
					localStorage.setItem('user_sign', JSON.stringify(res.user))
					dispatch({
						type: 'ADD_USER',
						payload: res.user,
					})
					swal("Success", "Usuario creado con exito", "success")
				}
			})
			.catch((error) => { console.log(error) })
	} catch (err) {
		console.log(err)
	}
}
	

export function resetPassword(userId) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${userId}/passwordReset`, {
			method: 'POST',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((data) =>
				dispatch({
					type: 'RESET_PASSWORD',
					payload: data,
				})
			)
	}
}


export function userLogout() {
	return function (dispatch) {
		return fetch('http://localhost:3001/logout', {
			credentials: 'include',
		}).then(() =>{
			localStorage.clear()
			dispatch({
				type: 'USER_LOGOUT',
			})
		}	
		)
	}
}

export function userChangePassword(input) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/password`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password: input }),
		})
			.then((res) => res.json())
			.then((data) =>
				dispatch({
					type: 'USER_CHANGE_PASSWORD',
					payload: data,
				})
			)
	}
}

export function addReviews(id, comments, userId, score) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/products/${id}/review`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ comments, userId, score }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((review) => {
				dispatch({
					type: 'ADD_REVIEWS',
					payload: review,
				})
				alert('Reseña agregada con exito', '', 'success')
			})
			.catch(() => {
				alert('Error!', 'Ingresar los datos ', 'error')
			})
	}
}