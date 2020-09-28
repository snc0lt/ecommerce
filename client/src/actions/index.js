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

export const getProductsByCategory = (id) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/category/${id}`)
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

export const getProductsBySearch = (query) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/products/?search=${query}`)
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

export const getProductDetail = (id) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/products/${id}`)
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
		swal('Algo salio mal', ':(', 'error')
	}
}


export const removeProduct = (id) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/products/${id}`, {
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


export const getCategories = () => async dispatch => {

	try {

		await fetch(`http://localhost:3001/category`)
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
			swal("Opps!", "La categoria ya existe!", "error")
		} else if (res.status === 201){
			dispatch({
				type: 'ADD_CATEGORY',
				payload: res.newCategory
			})
			 swal("Genial!", "Se ha creado la categoria exitosamente!", "success")
		} else {
			swal("Opps!", "Algo salio mal, vuelve a intertarlo!", "error")
		}
	
	} catch (err) {
		console.log(err)
	}	
}

export const removeCategory = (id) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/category/${id}`, {
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

export const getUsers = () => async dispatch =>{
	try {
		await fetch('http://localhost:3001/user', { credentials: 'include' })
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

export const getUserDetail = (id) => async dispatch => {
		await fetch(`http://localhost:3001/user/${id}`, {
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

export const userGoogle = () => dispatch => {
	dispatch({
		type: 'USER_GOOGLE'
	})
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

export const userLogin = (input, history) => async dispatch => {
		await fetch(`http://localhost:3001/login`, {
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
					swal("Usuario logueado con exito", "", "success")
					history.push('/')
				}
			})
			.catch((error) => {
				return { error: true, message: 'Error en login, intente otra vez' }
			})
	}


export const removeUser = (id) => async dispatch => {
		await fetch(`http://localhost:3001/user/${id}`, {
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
				swal('Cuenta de usuario eliminada', '', 'success')
			})
			.catch((err) => console.log(err))
}


export const getUserProductsCart = (userId) => async dispatch => {

	try {
		await fetch(`http://localhost:3001/user/${userId}/cart`, {
			credentials: 'include',
		})
			.then((res) => res.json())
			.then((order) => {
			if (order.length === 0) {
			}
			else {
				dispatch({
					type: 'GET_PRODUCTS_IN_CART',
					payload: order[0].products,
				})
			}
		})
	} catch (err) {
		console.log(err)
	}
	
}

export const deleteProductInCart = (userId, idProduct) => async dispatch => {
		await fetch(`http://localhost:3001/user/${userId}/cart`, {
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


export const updateCountProductInCart = (userId, idProduct, count) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/user/${userId}/cart`, {
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

export const addProductCart = (idUser, idProduct, priceProduct) => async dispatch => {
		await fetch(`http://localhost:3001/user/${idUser}/cart`, {
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

export const handleGuestCount = (value, index, state) => dispatch => {
	
	state[index] = value
	dispatch({
		type: 'ADD_GUEST_COUNT',
		payload: state
	})
}
export const handleGuestTotal = (value) => dispatch => {
	
	dispatch({
		type: 'ADD_GUEST_TOTAL',
		payload: value
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
	localStorage.removeItem('total_guest-cart')
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

export const getClosedOrders = () => async dispatch => {
		await fetch('http://localhost:3001/orders/admin?search=completa', {
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


export const promoteToAdmin = async (id,estado) => {
	try {
		await fetch(`http://localhost:3001/admin/promote/${id}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ isAdmin: estado })
		})
			.then(estado
				? swal('Usuario promovido a Admin', '', 'success')
			    : swal('Usuario revocado de Admin', '', 'success'))
			.catch((err) => console.log(err));	
	} catch (err) {
		console.log(err)
}
}


export const addUser = (user) => async dispatch => {
	try {
		await fetch('http://localhost:3001/user', {
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
					swal("Usuario creado con exito", "", "success")
				}
			})
			.catch((error) => { console.log(error) })
	} catch (err) {
		console.log(err)
	}
}

export const resetPassword = (userId) => async dispatch => {
		await fetch(`http://localhost:3001/user/${userId}/passwordReset`, {
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


export const userLogout = () => async dispatch => {
		await fetch('http://localhost:3001/logout', {
			credentials: 'include',
		}).then(() =>{
			localStorage.clear()
			dispatch({
				type: 'USER_LOGOUT',
			})
		}	
		)
}


export const userChangePassword = (input) => async dispatch => {
		await fetch(`http://localhost:3001/user/password`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password: input }),
		})
			.then((res) => res.json())
			.then((data) =>{
				dispatch({
					type: 'ADD_USER',
					payload: data,
				})
				swal("Password cambiado satisfactoriamente","","success")

			})
			.catch(err => swal("Ups","Ocurrió un error al cambiar la contraseña","error"))
		
}


export function userForgotPassword(input,token) {
	
		return fetch(`http://localhost:3001/user/password/${token}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ password: input }),
		})
			.then((res) => res.json())
			.then((data) =>{
				if(data.status === 401){
					swal("Error",`${data.msg}`,"error")	
				} else if(data.status === 200){
					swal("Password cambiado satisfactoriamente","","success")
				}
			})
			.catch(err => swal("Ups","Ocurrió un error al cambiar la contraseña","error"))
		
}


export const disableOrEnableUser = (userId, status) => async dispatch => {
	try {
		await fetch(`http://localhost:3001/user/${userId}/active/${status}`, {
			method: 'PUT',
			credentials: 'include',
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ active: status })
		})
		.then(res => res.json())
		.then(user => user.active
			? swal('Usuario habilitado', '', 'success')
			: swal('Usuario deshabilitado', '', 'success'))
		.catch((err) => console.log(err));
	} catch (err) {
		console.log(err)
	}
}

export const addReviews = (productId, review, userId, star) => async dispatch => {
		await fetch(`http://localhost:3001/products/postreview`, {
			method: 'POST',
			credentials: 'include',
			body: JSON.stringify({ comments:review, userId: userId, score:star, productId: productId }),
			headers: {
				Accept: 'application/json',
				'Content-Type': 'application/json',
			},
		})
			.then((res) => res.json())
			.then((review) => {
				if (review.status === 400) {
					swal('Error', 'Ya has realizado un review a este producto', 'error')
				}
				else if (review.status === 201) {
					dispatch({
						type: 'ADD_REVIEWS',
						payload: review,
					})
					swal('Reseña agregada con exito', '', 'success')
				}
			})
			.catch(() => {
				swal('Error!', 'Ingresar los datos ', 'error')
			})
}


// reset password mail
export const sendMail = async (mail) => {
	try {
		await fetch('http://localhost:3001/user/reset_password', {
		method: 'POST',
		body: JSON.stringify({email: mail}),
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(res=>res.json())
	.then(data=>swal("Success",`${data}`,"success"))	
	} catch (err) {
		console.log(err)
	}
}


// mail cuando haces la compra to, subject, products, user
export const buyMail = async (to, subject, products, user) => {
	try {
		await fetch('http://localhost:3001/complete_buy', {
			method: 'POST',
			body: JSON.stringify({to, subject, products, user}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
	} catch (err) {
	}
} 


// mail cuando se despacha la compra
export const dispatchMail = async (to, subject, user, id) => {
	try {
		await fetch('http://localhost:3001/dispatch_buy', {
			method: 'POST',
			body: JSON.stringify({to: to, subject: subject, user: user, id: id}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log('tu compra ha sido despachada..!')
	} catch (err) {
		console.log('ERROR, no esta mandando el mail', err)
	}
} 


// mail cuando se cancela la compra
export const cancelMail = async (to, subject, user, id) => {
	try {
		await fetch('http://localhost:3001/cancel_buy', {
			method: 'POST',
			body: JSON.stringify({to: to, subject: subject, user: user, id: id}),
			headers: {
				'Content-Type': 'application/json'
			}
		})
		console.log('tu compra ha sido cancelada..!')
	} catch (err) {
		console.log(err)
	}
} 