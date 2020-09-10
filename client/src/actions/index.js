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

	// return function (dispatch) {
	// 	return fetch('http://localhost:3001/products', {
	// 		credentials: 'include',
	// 	})
	// 		.then((res) => res.json())
	// 		.then((products) =>
	// 			dispatch({
	// 				type: 'GET_PRODUCTS',
	// 				payload: products,
	// 			})
	// 		)
	// 		.catch((error) => console.log(error))
	// }
}

export function getProductsByCategory(query) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/category/${query}`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((products) => {
				dispatch({
					type: 'GET_PRODUCTS',
					payload: products.products,
				})
			})
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

	// return function (dispatch) {
	// 	return fetch(`http://localhost:3001/products/${searchProduct}`, {
	// 		credentials: 'include',
	// 	})
	// 		.then((res) => res.json())
	// 		.then((products) =>
	// 			dispatch({
	// 				type: 'GET_PRODUCTS',
	// 				payload: products,
	// 			})
	// 		)
	// 		.catch((err) => {
	// 			alert('No hay productos para esa busqueda!')
	// 		})
	// }
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

	// return function (dispatch) {
	// 	return fetch(`http://localhost:3001/products/${id}`, {
	// 		credentials: 'include',
	// 	})
	// 		.then((response) => response.json())
	// 		.then((product) =>
	// 			dispatch({
	// 				type: 'GET_PRODUCT_DETAIL',
	// 				payload: product,
	// 			})
	// 		)
	// 		.catch((err) => {
	// 			return { error: true }
	// 		})
	// }
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


	// return function (dispatch) {
	// 	fetch(`http://localhost:3001/products/${id}`, {
	// 		method: 'DELETE',
	// 		credentials: 'include',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((product) => {
	// 			dispatch({
	// 				type: 'REMOVE_PRODUCT',
	// 				payload: product.id,
	// 			})
	// 			alert('Se elimino el producto correctamente', '', 'success')
	// 		})
	// 		.catch((err) => console.log(err))
	// }
}

// export const updateProduct = (id, product, msg) => async dispatch => {

// return function (dispatch) {
// 	fetch(`http://localhost:3001/products/${id}`, {
// 		method: 'PUT',
// 		credentials: 'include',
// 		headers: {
// 			'Content-Type': 'application/json',
// 		},
// 		body: JSON.stringify(product),
// 	})
// 		.then((res) => res.json())
// 		.then((product) => {
// 			dispatch({
// 				type: 'UPDATE_PRODUCTS',
// 				payload: product,
// 			})
// 			alert('Se modifico el Producto', '', 'success')
// 		})
// 		.catch((err) => console.log(err))
// }
// }

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

		// .then(function (response) {
		// 	return response.json()
		// })
		// .then(function (category) {
		// 	setCategorias(category)
		// })
		// .catch(function (err) {
		// 	console.log(err)
		// })
	} catch (err) {
		console.log(err)
	}
	// return function (dispatch) {
	// 	return fetch('http://localhost:3001/category', {
	// 		credentials: 'include',
	// 	})
	// 		.then((res) => res.json())
	// 		.then((category) =>
	// 			dispatch({
	// 				type: 'GET_CATEGORIES',
	// 				payload: category,
	// 			})
	// 		)
	// }
}

export const addCategory = (category, msg) => async dispatch => {
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
		dispatch({
			type: 'ADD_CATEGORY',
			payload: res.newCategory
		})
		msg(res.msg)
		// .then(data => data.json())
		// .then((res) => {
		// 	setMessage(res);
		// 	swal("Genial!", "Se ha creado la categoria exitosamente!", "success");
		// 	resetForm();
		// })
		// .catch((err) => {
		// 	console.log(err);
		// 	swal("Upa!", "¡Algo salio mal!", "error")

		// })
	} catch (err) {
		console.log(err)
	}

	// return function (dispatch) {
	// 	return fetch('http://localhost:3001/category', {
	// 		method: 'POST',
	// 		credentials: 'include',
	// 		body: JSON.stringify(category),
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((response) => {
	// 			if (response.error) {
	// 				return response
	// 			} else {
	// 				dispatch({
	// 					type: 'ADD_CATEGORY',
	// 					payload: response.category,
	// 				})
	// 				return response
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			return { error: true, message: 'Error durante la creacion de la catgoria. Intentar otra vez!' }
	// 		})
	// }
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
	// return function (dispatch) {
	// 	return fetch(`http://localhost:3001/category/${id}`, {
	// 		method: 'DELETE',
	// 		credentials: 'include',
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((category) => {
	// 			dispatch({
	// 				type: 'REMOVE_CATEGORY',
	// 				payload: category.id,
	// 			})
	// 			alert('Categoria eliminada', '', 'success')
	// 		})
	// 		.catch((err) => console.log(err))
	// }
}

export function getUsers() {
	return function (dispatch) {
		return fetch('http://localhost:3001/user', { credentials: 'include' })
			.then((res) => res.json())
			.then((users) =>
				dispatch({
					type: 'GET_USERS',
					payload: users,
				})
			)
	}
}

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
				dispatch({
					type: 'ADD_USER',
					payload: res.user,
				})
			})
			.catch((error) => { console.log(error) })
	} catch (err) {
		console.log(err)
	}
	// return function (dispatch) {
	// 	return fetch('http://localhost:3001/user', {
	// 		method: 'POST',
	// 		credentials: 'include',
	// 		body: JSON.stringify(user),
	// 		headers: {
	// 			Accept: 'application/json',
	// 			'Content-Type': 'application/json',
	// 		},
	// 	})
	// 		.then((res) => res.json())
	// 		.then((response) => {
	// 			// el response que viene del back es un objeto con las propiedades: 
	// 			// - success, message y user (si fue creado)
	// 			// - error, message (si no se creo)
	// 			//aca meteria return response
	// 			if (response.error) {
	// 				return response
	// 			} else {
	// 				dispatch({
	// 					type: 'ADD_USER',
	// 					payload: response.user,
	// 				})
	// 				return response
	// 			}
	// 		})
	// 		.catch((error) => {
	// 			return { error: true, message: 'Error durante la creacion del usuario. Intentar otra vez!' }
	// 		})
	// }
}

export const loginUser = (data) => dispatch => {
	try {
		fetch(`http://localhost:3001/login`,{
			method: 'POST',
			body: JSON.stringify(data),
			headers: {
				'Accept': 'application/json',
				'Content-Type': 'application/json'
			}
		})
		.then(data => data.json())
		.then(res => {
			dispatch({
				type: 'LOGIN_USER',
				payload: res.user
			})
		})
	} catch (err) {
		console.log(err)
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

export function getProductsCart(userId) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${userId}/cart`, {
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
				dispatch({
					type: 'DELETE_PRODUCT_CART',
					payload: product.productId,
				})
			})
	}
}

export function updateCountProductInCart(userId, idProduct, count) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${userId}/cart`, {
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

export function cleanOrder(idUser) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/user/${idUser}/cart`, {
			method: 'DELETE',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		}).then((res) =>
			res.status === 200
				? dispatch({
					type: 'CLEAN_ORDER',
				})
				: alert('Error al cancelar la orden', '', 'error')
		)
	}
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

export function promoteToAdmin(id) {
	return function (dispatch) {
		return fetch(`http://localhost:3001/admin/promote/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			}
		})
			.then((res) => res.json())
			.then((user) => {
				dispatch({
					type: 'PROMOTE_TO_ADMIN',
					payload: user,
				})
				alert('Usuario Promovido a Admin', '', 'success')
			})
			.catch((err) => console.log(err))
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

export function userLogin(input) {
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
				dispatch({
					type: 'USER_LOGGED',
					payload: response.user,
				})
				return response
			})
			.catch((error) => {
				return { error: true, message: 'Error en login, intente otra vez' }
			})
	}
}

export function userLogout() {
	return function (dispatch) {
		return fetch('http://localhost:3001/logout', {
			credentials: 'include',
		}).then(() =>
			dispatch({
				type: 'USER_LOGOUT',
			})
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