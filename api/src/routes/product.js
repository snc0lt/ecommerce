const server = require('express').Router()
const { Op } = require('sequelize')
const { Product, Category, Review, User } = require('../db.js')


function isAuthenticated(req, res, next) {
	if (req.isAuthenticated()) {
		next()
	} else {
		res.status(401).send('No autorizado')
	}
}

function isAdmin(req, res, next) {
	if (req.user.isAdmin) {
		next()
	} else {
		res.status(403).send('No es un administrador')
	}
}

// Busca el producto por ID y devulve el Producto con sus categorias
server.get('/:id', (req, res) => {
	Product.findOne({ where: { id: req.params.id }, include: [Category, Review] })
		.then((product) => {
			if (!product) return res.status(404).send('Id no válido')
			res.status(200).json(product)
		})
		.catch((err) => res.status(404).send(err))
})

// Si el req tiene un query Search filtra los productos que coincidan con ese valor en sus propiedades name O description

server.get('/', (req, res) => {
	if (req.query.search) {
		const value = req.query.search
		Product.findAll({
			where: {
				[Op.or]: [
					{
						name: {
							[Op.iLike]: `%${value}%`,
						},
					},
					{
						description: {
							[Op.iLike]: `%${value}%`,
						},
					},
				],
				// stock: {
				// 	[Op.gt]: 0,
				// }  
			},
		}).then((products) => {
			if (products.length == 0) {
				res.status(404).send({msg: 'No se encontro ningun producto'})
				console.log({msg: 'No se encontro ningun producto'})
			} else {
				res.status(200).send(products)
			}
		})
	} else {
		Product.findAll({
			include: [Category],
			// where: {
			// 	stock: {
			// 		[Op.gt]: 0,
			// 	}  
			// }
		}).then((products) => res.send(products))
	}
})
// Crea el Producto - Verifica que le pasen los datos requeridos- Lo asocia con sus categorias
server.post('/', (req, res) => {
	console.log(req.body)
	const { name, description, price, stock, image, category } = req.body

	if (
		!name ||
		!description ||
		!price ||
		!stock ||
		!image ||
		category.length === 0
	) {
		res.status(400).send({msg: 'Todos los campos requeridos'})
	}

	Product.create({
		name,
		description,
		price,
		stock,
		image,
		category
	}).then((product) => {
		// product
		// 	.setCategories(category)
		// 	.then(() => 
			res.status(201).send({msg: 'producto creado exitosamente', product})
			console.log(product)
	}).catch ((err) => {
		console.log("error: ",err);
	})
})

// Elimina el Producto en base a su ID

server.delete('/:id', (req, res) => {
	Product.findByPk(req.params.id)
		.then((product) => {
			product.destroy().then(() => {
				res.status(200).json(product)
			})
		})
		.catch((err) => res.status(404).send('Id no valido'))
})

// Actualiza el Producto en base a su ID - Le remueve todas sus anteriores categorias y le setea las nuevas
server.put('/:id', (req, res) => {
	const { name, description, price, stock, image, category } = req.body
	
	if (
		!name ||
		!description ||
		!price ||
		!stock ||
		!image ||
		category.length === 0
	) {
		res.status(400).send({msg: 'Debe enviar los campos requeridos'})
		return
	}

	Product.findByPk(req.params.id)
		.then((product) => {
			product.name = req.body.name || product.name
			product.description = req.body.description || product.description
			product.price = req.body.price || product.price
			product.stock = req.body.stock || product.stock
			product.image = req.body.image || product.image
			product.category = req.body.category || product.category
			// product.removeCategories()
			product.save().then((prod) => {
				res.status(204).send({msg: 'producto actualizado exitosamente', prod})
				// prod.setCategories(categories).then(() =>
				// 	res.status(201).send(product)
				// )
			})
		})
		.catch((err) => res.status(404).send('Id no valido'))
})

// modifica stock del producto 
server.put('/stock/:id', (req, res) => {
	Product.findByPk(req.params.id)
		.then((product) => {
			product.stock = req.body.stock
			product.save().then((prod) => {
				res.status(204).send({msg: 'producto actualizado exitosamente', prod})
			})
		})
		.catch((err) => res.status(404).send('Id no valido'))
})

//crear reviews
server.post("/postreview", isAuthenticated, async (req, res) => {
	const {comments, score, userId, productId} = req.body

	if(!score || !comments ){
		res.status(400).send('Debe enviar los campos requeridos')
	}
	try {
		const userReview = await Review.findOne({
			where: {
				userId: userId,
				productId: productId
			}
		})
		if(userReview){
			res.status(400).send({msg: 'ya hiciste un review a este producto..!', status: 400})
			return
		}
		const newReview = await Review.create({
			comments,
			score,
			productId,
			userId
			})
			res.status(201).send({msg: 'review creada con exito', newReview, status: 201})
	} catch (err) {
		res.status(500)
	}

	
})

// Trae reviews de un usuario en particular, panel usuario
server.get('/:userId/:productId/review', isAuthenticated, async (req, res) => {
	try {
			const data = await Review.findAll({
				where: {
					userId: req.params.userId
				}
			})
			if (data) {
				res.status(200).send(data)
			}
			else {
				res.status(404).send('Reviews no encontradas')
		}
	}
	catch (err) {console.log(err)}
})

// Trae reviews de un producto en particular, detalle producto
server.get('/:productId/productreview', /*isAuthenticated*/ async (req, res) => {
	try {
		const data = await Review.findAll({
			where: {
				productId: req.params.productId
			},
			include: [{
				model: Product
			},
			{
				model: User
			}]
		})
		if (data) {
			res.status(200).send(data)
		}
		else {
			res.status(404).send('Reviews no encontradas')
		}
	}
	catch (err) {console.log(err)}
})

//eliminar reviews
server.delete("/:idProduct/review/:idReview", isAuthenticated, (req, res) => {
	Review.findOne({
		where: {
			[Op.and]: [
				{
					productId: req.params.idProduct
				},
				{
					id: req.params.idReview,
				},
			],
		}})
	.then(review => {
			review.destroy().then(() => {
				res.send(review)
			})	
	})
	.catch(() => res.status(404).send('Id no valido'))
})

//modificar reviews
server.put("/:idProduct/review/:idReview", isAuthenticated, (req, res) =>{
	const {comments, score, userId} = req.body
	
	if(!score || !comments ){
		res.status(400).send('Debe enviar los campos requeridos')
		return
	}

	Review.findOne({
		where: {
			[Op.and]: [
				{
					productId: req.params.idProduct
				},
				{
					id: req.params.idReview,
				},
			],
		}}).then(review => {
			review.userId = userId || review.userId
			review.comments = comments || review.comments
			review.score = score || review.score
			review.save().then(rev => {
				res.status(200).send(rev)
			} )
		})
		.catch((err) => res.status(404).send('Id no valido'))
})


// // Elimina el Producto en base a su ID

// server.delete('/:id', (req, res) => {
// 	Product.findByPk(req.params.id)
// 		.then((product) => {
// 			product.destroy().then(() => {
// 				res.status(200).json(product)
// 			})
// 		})
// 		/.catch((err) => res.status(404).send('Id no valido'))
// })

// // Actualiza el Producto en base a su ID - Le remueve todas sus anteriores categorias y le setea las nuevas
// server.put('/:id', (req, res) => {
// 	const { name, description, price, stock, image, categories } = req.body
	
// 	if (
// 		!name ||
// 		!description ||
// 		!price ||
// 		!stock ||
// 		!image ||
// 		categories.length === 0
// 	) {
// 		res.status(400).send('Debe enviar los campos requeridos')
// 		return
// 	}

// 	Product.findByPk(req.params.id)
// 		.then((product) => {
// 			product.name = req.body.name || product.name
// 			product.description = req.body.description || product.description
// 			product.price = req.body.price || product.price
// 			product.stock = req.body.stock || product.stock
// 			product.image = req.body.image || product.image
// 			product.removeCategories()
// 			product.save().then((prod) => {
// 				prod.setCategories(categories).then(() =>
// 					res.status(201).send(product)
// 				)
// 			})
// 		})
// 		.catch((err) => res.status(404).send('Id no valido'))
// })
// //crear reviews
// server.post("/:id/review", isAuthenticated,  (req, res) => {
// 	const {comments, score, userId} = req.body
	
// if(!score || !comments ){
// 	res.status(400).send('Debe enviar los campos requeridos')
// 	return
// }

// 	Review.create({
// 	comments,
// 	score,
// 	productId: req.params.id,
// 	userId
// 	})
// 	.then(review => res.status(201).send(review))
// 	.catch(err=> res.status(400).send("ERROR EN REVIEW " + err))
// })

// //eliminar reviews
// server.delete("/:idProduct/review/:idReview", isAuthenticated, (req, res) => {
// 	Review.findOne({
// 		where: {
// 			[Op.and]: [
// 				{
// 					productId: req.params.idProduct
// 				},
// 				{
// 					id: req.params.idReview,
// 				},
// 			],
// 		}})
// 	.then(review => {
// 			review.destroy().then(() => {
// 				res.send(review)
// 			})	
// 	})
// 	.catch(() => res.status(404).send('Id no valido'))
// })

// //modificar reviews
// server.put("/:idProduct/review/:idReview", isAuthenticated, (req, res) =>{
// 	const {comments, score, userId} = req.body
	
// 	if(!score || !comments ){
// 		res.status(400).send('Debe enviar los campos requeridos')
// 		return
// 	}

// 	Review.findOne({
// 		where: {
// 			[Op.and]: [
// 				{
// 					productId: req.params.idProduct
// 				},
// 				{
// 					id: req.params.idReview,
// 				},
// 			],
// 		}}).then(review => {
// 			review.userId = userId || review.userId
// 			review.comments = comments || review.comments
// 			review.score = score || review.score
// 			review.save().then(rev => {
// 				res.status(200).send(rev)
// 			} )
// 		})
// 		.catch((err) => res.status(404).send('Id no valido'))
// })

module.exports = server;

