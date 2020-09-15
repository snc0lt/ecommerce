const server = require('express').Router()
const { User } = require('../db.js')


server.put('/promote/:id', (req, res) => {
	const estado  = req.body.isAdmin;
	User.findByPk(req.params.id)
		.then((user) => {
			if (!user) return res.status(404).send('Id no válido')
			return user.update({ isAdmin: estado })
		})
		.then((user) => res.send(user))
		.catch((err) => res.status(500).send(err))
})

module.exports = server
