const server = require('express').Router()
const { Op } = require('sequelize');

const { Category, Product } = require('../db.js')

// Busca la categoria por su Nombre y la devuelve con Todos sus Productos asociados
server.get('/:id', (req, res) => {
	const capName = req.params.id;

	Product.findAll({
		// include: [Category],
		where: {
			category: { [Op.contains]: [capName] },
		},
	})
		.then((producto) =>
			!producto
				? res.status(404).send('No se encontraron productos')
				: res.send(producto)
		)
		.catch((err) => res.status(404).send(err))
})

server.get('/single/:name', (req, res) => {
	const capName =
		req.params.name

	Category.findOne({
		where: {
			id: capName,
		},
	})
		.then((cat) =>
			!cat
				? res.status(404).send('No se encontro la categoria')
				: res.send(cat)
		)
		.catch((err) => res.status(404).send(err))
})

// Trae TODAS las categorias
server.get('/', (req, res) => {
	Category.findAll().then((categories) => res.send(categories))
})

// Crea una nueva categoria con su Nombre Capitalizado
server.post('/', async (req, res) => {
	const { name, description } = req.body
	const capName = name.charAt(0).toUpperCase() + name.slice(1)

	if (!name || !description) {
		res.status(400).send('Debe enviar los campos requeridos')
		return
	}
	try {
		const categoria = await Category.findOne({
			where: {
				name: capName
			}
		})
		if (categoria) {
			res.status(400).send({ msg: 'la categoria ya existe', status: 400})
		} else {
			try {
				const newCategory = await Category.create({
					name: capName,
					description,
				})
				res.status(201).send({msg: 'categoria creada exitosamente', status: 201, newCategory})
			} catch (err) {
				console.log(err)
				res.status(400)
			}
		}
	}	catch (err) {
		console.log(err)
	}
})

// Actualiza la categoria segun su ID
server.put('/:id', (req, res) => {
	const { name, description } = req.body
	const capName = name.charAt(0).toUpperCase() + name.slice(1)
	Category.findByPk(req.params.id)
		.then((cat) => {
			cat.name = capName || cat.name
			cat.description = description || cat.description

			cat.save().then((cat) => {
				res.status(201).send(cat)
			})
		})
		.catch((err) => res.status(400).send('Id no valido'))
})

// Borra la categoria en base a su ID
server.delete('/:id', (req, res) => {
	Category.findByPk(req.params.id)
		.then((cat) => {
			cat.destroy()
			res.status(200).send('Categoria eliminada')
		})
		.catch((err) => res.status(404).send('Categoria NO encontrada'))
})

module.exports = server
