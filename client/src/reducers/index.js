const initialstate = {
	products: [],
	categories: [],
	productDetail: {},
	categoryDetail: {},
	users: [],
	user: {},
	userDetails: {},
	cart: [],
	guestCart: [],
	closedOrders: [],
	userLogged: false,
	userGoogle: false,
	reviews: [],
	guestCount: [],
	guestTotal: [],
	reset: {}
}

export default function rootReducer(state = initialstate, action) {
	switch (action.type) {
		case 'SET_PRODUCTS': /*listo */
			return {
				...state,
				products: action.payload,
			}

		case 'GET_PRODUCT_DETAIL': /*listo */
			return {
				...state,
				productDetail: action.payload,
			}
		case 'CREATE_PRODUCT':	/*listo */
			return {
				...state,
				products: [...state.products, action.payload]
			}

		case 'REMOVE_PRODUCT': /*listo */
			return {
				...state,
				products: state.products.filter(
					(product) => product.id !== action.payload
				),
			}

		case 'ADD_CATEGORY': /*listo */
			return {
				...state,
				categories: [...state.categories, action.payload],
			}

		case 'GET_CATEGORY_DETAIL': /*pendiente */
			return {
				...state,
				categoryDetail: action.payload,
			}

		case 'GET_CATEGORIES': /*listo */
			return {
				...state,
				categories: action.payload,
			}

		case 'REMOVE_CATEGORY':  /*listo */
			return {
				...state,
				categories: state.categories.filter(
					(category) => category.id !== action.payload
				),
			}

		case 'SET_USER': /// lo mismo que LOGIN_USER !!
			return{
				...state,
				userDetails: action.payload,
				user: action.payload,
				userLogged: true,
			}

		case 'GET_USERS': /*listo*/
			return {
				...state,
				users: action.payload,
			}
		case 'LOGIN_USER': /*listo */
			return {
				...state,
				userDetails: action.payload,
				user: action.payload,
				userLogged: true,
			}
		case 'GET_USER_DETAIL':
			return {
				...state,
				user: action.payload,
				userDetail: action.payload,
			}

		case 'ADD_USER': /*listo*/
			return {
				...state,
				user: action.payload
			}
		
		case 'REMOVE_USER':
			return {
				...state,
				users: state.users.filter((user) => user.id !== action.payload),
			}
		case 'GET_PRODUCTS_IN_CART':
			return {
				...state,
				cart: action.payload,
			}

		case 'DELETE_PRODUCT_CART':
			return {
				...state,
				cart: state.cart.filter(
					(product) => product.id !== action.payload
				),
			}

		case 'UPDATE_COUNT_PRODUCT':
			return {
				...state,
				cart: action.payload,
			}

		case 'ADD_PRODUCT_IN_CART':
			return {
				...state,
				cart: action.payload
				// cart: [...state.cart, action.payload]
			}
		case 'SET_GUEST_CART':
			return{
				...state,
				guestCart: action.payload
			}
		case 'ADD_PRODUCT_IN_GUEST_CART':
			return{
				...state,
				guestCart: [...state.guestCart, action.payload]
			}

		case 'REMOVE_GUEST_ITEM':
			return {
				...state,
				guestCart: action.payload
			} 
		case 'CLEAN_GUEST_CART':
			return {
				...state,
				guestCart: []
			}
		case 'CLEAN_ORDER':
			return {
				...state,
				cart: [],
			}
		case 'GET_CLOSED_ORDERS':
			return {
				...state,
				closedOrders: action.payload,
			}
		case 'GET_ORDER_DETAIL':
			return {
				...state,
				ordersDetail: action.payload,
			}
		
		// // case "PROMOTE_TO_ADMIN":
		// 	return {
		// 		...state,
		// 		userDetail: action.payload,
		// 	}
		case 'RESET_PASSWORD':
			return {
				...state,
				users: action.payload,
			}
		case 'RESET':
			return {
				...state,
				reset: action.payload,
			}
		case 'USER_LOGGED': // lo mismo que LOGIN_USER!!!
			return {
				...state,
				userDetails: action.payload,
				userLogged: true,
				guestTotal: [],		
			}
	    case 'USER_GOOGLE':
			return {
				...state,
				userGoogle: true,
			}
		case 'USER_LOGOUT': /*listo*/
			return {
				...state,
				user: null,
				users: [],
				guestCart: [],
				userDetails: {},
				userLogged: false,
				userGoogle: false,
				cart: []
			}
		// case 'USER_CHANGE_PASSWORD':
		// 	return {
		// 		...state,
		// 		userLogged: action.payload,
		// 	}
		case "ADD_REVIEWS":
			return {
				...state,
				reviews: state.reviews.concat(action.payload)
			}

		case 'ADD_GUEST_COUNT':
			return{
				...state,
				guestCount: action.payload
			}

		case 'ADD_GUEST_TOTAL':
		return{
			...state,
			guestTotal: action.payload

		}
		
		default:
			return state
	}
}
