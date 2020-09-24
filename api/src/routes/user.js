const server = require('express').Router()
const { Product, User, Order, Order_product } = require('../db.js')
const { Op } = require('sequelize')
const bcrypt = require('bcrypt')
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken')

const transporter = nodemailer.createTransport({
	service: 'gmail',
	host: 'smtp.gmail.com',
	port: 465,
	secure: true,
	auth: {
	  type: 'OAuth2',
	  user: process.env.user,
	  clientId: process.env.clientId,
	  clientSecret: process.env.clientSecret,
	  refreshToken: process.env.refreshToken,
	  accessToken: process.env.accessToken
	}
  })

//

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

//nodemailer

server.post('/reset_password', async (req, res) => {
	const { email } = req.body	
	const usuario = await User.findOne({
		where: {
			email: email
		}
	})
	if (usuario) {
		// const randomId = usuario.id * 12345678
		const emailToken = jwt.sign({ id: usuario.id }, process.env.JWT_SECRET, { expiresIn: '1d' })
		const url = `http://localhost:3000/user/resetpassword/recordar/${emailToken}`
		const mailOptions = {
			from: process.env.user,
			to: email,
			subject: 'Restablece tu contraseña!',
			html: `Please click the link to change your password <a href='${url}'>${url}</a>. Este link tiene una feche de expiracion de un dia..!` 
		  }
		  transporter.sendMail(mailOptions, (err, response) => {
			if (err) {
				console.log(err)
			  res.status(400).send({msg: 'Invalid Token, check expriration date...!'})
			} else {
			  console.log('email sent')
			  res.status(200).send('email sent successfully..!')
			}
		  })
	} else {
		res.status(400).send({ msg: 'usuario no existe', status: 400 })
	}	
  })

//trae todos los usuarios
server.get('/', (req, res) => {
	User.findAll().then((users) => {
		res.status(200).send(users)
	})
})

//trae un usuario en particular
server.get('/:id', (req, res) => {
	User.findByPk(req.params.id).then((user) => {
		res.status(200).send(user)
	})
})

server.post('/email', async (req, res) => {

	try {
		const usuario = await User.findOne({
			where: {
				email: req.body.email
			}
		})
		if (usuario) {
			res.status(200).send({ msg: 'este es tu usuario', status: 200, usuario })
		} else {
			res.status(400).send({ msg: 'usuario no existe', status: 400 })
		}
	} catch (err) {
		res.status(500).send(err)
	}
})

// Encuentra el Administrador
server.get('/admin/email', async (req, res) => {
	try {
		const usuario = await User.findOne({
			where: {
				email: 'admin@admin.com'
			}
		})
		if (usuario) {
			res.status(200).send({ msg: 'este es tu usuario', status: 200, usuario })
		} else {
			res.status(400).send({ msg: 'usuario no existe', status: 400 })
		}
	} catch (err) {
		res.status(500).send(err)
		console.log(err)
	}
})

//crear usuariopassword
server.post('/', async (req, res) => {
	const { firstName, lastName, email, password, isAdmin, isGoogle, imageGoogle} = req.body

	if (!firstName || !lastName || !email || !password) {
		res.status(400).json({
			error: true,
			message: 'Debe enviar los campos requeridos'
		})
	}
	try {
		const usuario = await User.findOne({
			where: {
				email: email
			}
		})
		if (usuario) {
			res.status(400).send({ msg: 'El email ya existe', status: 400 })
		} else {
			try {
				const user = await User.create({ firstName, lastName, email, password, isAdmin, isGoogle, imageGoogle, active: true })
				res.status(201).send({ msg: 'Usuario creado con exito', user, status: 201 })
			}
			catch (err) { res.status(400).send(err) }
		}
	} catch (err) {
		res.status(500).send(err)
	}

	// User.create({ firstName, lastName, email, password, isAdmin })
	// .then((user) => {
	// 	res.status(201).json({
	// 		success: true,
	// 		message: 'El usuario fue creado correctamente!!!!',
	// 		user: user
	// 	})
	// })
	// .catch( err => {
	// 	res.status(500).json({
	// 		error: true,
	// 		message: 'El email ya esta siendo utilizado!!!'
	// 	})
	// })
})


// usuario logueado cambia su contraseña
server.put('/password', isAuthenticated, async (req, res) => {
	try {
		let user = await User.findByPk(req.user.id)
		let newPassword = await hashPassword(req.body.password)

		await user.update({ password: newPassword, resetPassword: false })

		res.send(user)
	} catch (error) {
		res.status(500).send(error)
	}
})

// usuario olvida su contraseña
server.put('/password/:token', async (req, res) => {
	try {
		// get user id from the token..!
		const { id } = jwt.verify(req.params.token, process.env.JWT_SECRET)
		if(!id) {
			console.log('no matching id..!')
			return res.status(400).send({msg: 'Invalid Token, check expriration date..!', status: 401})
		}
		// find the user with that id
		let user = await User.findByPk(id)
		// hash the password 
		let newPassword = await hashPassword(req.body.password)

		// update the user with the new password
		await user.update({ password: newPassword, resetPassword: false })

		// send the response
		res.send({msg: 'yeahhh', user, status: 200})
	} catch (error) {
		console.log(error)
		res.status(500).send(error)
	}

	// const { id } = await jwt.verify(req.params.token, process.env.JWT_SECRET, async function (err, user) {
	// 	if(err){
	// 		console.log(err)
	// 		res.status(401).send({msg: 'Invalid Token, check expriration date..!', status: 401})
	// 	} else {
	// 		try {
	// 			let user = await User.findByPk(id)
	// 			let newPassword = await hashPassword(req.body.password)
		
	// 			await user.update({ password: newPassword, resetPassword: false })
		
	// 			res.send({msg: 'yeahhh', user, status: 200})
	// 		} catch (error) {
	// 			console.log(error)
	// 			res.status(500).send(error)
	// 		}
	// 	}
	// })	
})

//modificar usuario
server.patch('/:id', isAuthenticated, async (req, res) => {
	try {
	const { 
		firstName, 
		lastName, 
		email, 
		password, 
		address, 
		phone, 
		city, 
		province, 
		postalcode, 
		country } = req.body

	const user = await User.findByPk(req.user.id)
		await user.update({
			firstName: firstName || user.firstName,
			lastName : lastName || user.lastName,
			email : email || user.email,
			password : password || user.password,
			address : address || user.address,
			phone : phone || user.phone,
			resetPassword : false,
			city: city || user.city,
			province: province || user.province,
			postalcode: postalcode || user.postalcode,
			country: country || user.country
		})
		res.send(user)
	} catch (error) {console.log(err)}
})


//eliminar usuario
server.delete('/:id', (req, res) => {
	User.findByPk(req.params.id)
		.then((user) => {
			user.destroy().then((user) => {
				res.status(200).send(user)
			})
		})
		.catch(() => res.status(404).send('Id no valido'))
})

//Agrega productos al carrito

server.post('/:userId/cart', async (req, res) => {
	const order = await Order.findOrCreate({
		where: {
			userId: req.params.userId,
			state: 'creada',
		},
	})
	const item = await Order_product.findOrCreate({
		where: {
			orderId: order[0].id,
			productId: req.body.productId,
			price: req.body.price,
		},
	})
	await item[0].update({
		where: {
			quantity: item[0].increment('quantity'),
		},
	})

	const product = await Order.findOne({
		where: { userId: req.params.userId, state: 'creada' },
		include: [Product],
	})

	res.send(product)
})

//Retorna todos los elementos del carrito
server.get('/:userId/cart', (req, res) => {
	Order.findAll({
		where: { userId: req.params.userId, state: 'creada' },
		include: { model: Product },
	}).then((order) => res.send(order))
})

//Eliminar producto especifico o Vacía el carrito

server.delete('/:userId/cart', async (req, res) => {
	const order = await Order.findOne({
		where: { userId: req.params.userId, state: 'creada' },
	})

	if (req.body.productId) {
		const item = await Order_product.findOne({
			where: {
				[Op.and]: [
					{
						orderId: order.id,
					},
					{
						productId: req.body.productId,
					},
				],
			},
		})
		await item.destroy()
		res.send({ msg: 'item deleted', item })
	} else {
		await Order_product.destroy({
			where: { orderId: order.id },
		})

		order.state = 'cancelada'
		await order.save()

		res.send(order)
	}
})

//Modifica la cantidad

server.put('/:userId/cart', async (req, res) => {
	const order = await Order.findOne({
		where: { userId: req.params.userId, state: 'creada' },
	})

	const item = await Order_product.findOne({
		where: {
			[Op.and]: [
				{
					orderId: order.id,
				},
				{
					productId: req.body.productId,
				},
			],
		},
	})

	item.quantity = req.body.quantity

	await item.save()

	const product = await Order.findOne({
		where: { userId: req.params.userId, state: 'creada' },
		include: [Product],
	})

	res.send(product)
})

server.post('/:id/passwordReset', /*isAuthenticated, isAdmin,*/(req, res) => {
	User.findByPk(req.params.id)
		.then((user) => {
			if (!user) return res.status(404).send('Id no valido')
			return user.update({ resetPassword: true })
		})
		.then(() => res.redirect('/user'))
		.catch((err) => res.status(500).send(err))
})

// Hooks oara encriptar la contraseña antes de crear o modificar usuario
User.addHook('beforeCreate', (user) => {
	return hashPassword(user.password)
		.then((newPassword) => {
			user.set('password', newPassword)
		})
		.catch((err) => {
			if (err) console.log(err)
		})
})

// Modifica el status de Active
// ACEPTA LOS VALORES DE ENABLE / DISABLE
server.put('/:id/active/:status', (req, res) => {

	User.findByPk(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send('Id de usuario no valido');
			}

			if (req.params.status === 'ENABLE') {
				user.update({ active: true });
				return res.status(201).send(user);

			}
			if (req.params.status === 'DISABLE') {
				user.update({ active: false });
				return res.status(201).send(user);
			}

			return res.status(400).send('PARAMETRO NO VALIDO');
		});
});

// BUSCA SI EL STATUS DE UN USUARIO
server.get('/:id/active/', (req, res) => {
	User.findByPk(req.params.id)
		.then((user) => {
			if (!user) {
				return res.status(404).send('Id de usuario no valido');
			};

			if (user) {
				return res.status(200).send(user.active)
			}

			else {
				return res.status(404).send('ERROR');
			}

		});
});




// User.addHook('beforeUpdate', (user) => {
// 	if (user.resetPassword) {
// 		return
// 	} else {
// 		return hashPassword(user.password)
// 			.then((newPassword) => {
// 				user.set('password', newPassword)
// 			})
// 			.catch((err) => {
// 				if (err) console.log(err)
// 			})
// 	}
// })

function hashPassword(password) {
	return new Promise(function (resolve, reject) {
		bcrypt.genSalt(10, function (err, salt) {
			if (err) return reject(err)
			else {
				bcrypt.hash(password, salt, function (err, hash) {
					if (err) return reject(err)
					return resolve(hash)
				})
			}
		})
	})
}

module.exports = server
