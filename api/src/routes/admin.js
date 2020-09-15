const server = require('express').Router()
const { User } = require('../db.js')

// function isAdmin(req, res, next) {
// 	if (req.user.isAdmin) {
// 		next()
// 	} else {
// 		res.status(403).send('No es un administrador')
// 	}
// }

server.put('/promote/:id', /*isAdmin,*/ (req, res) => {
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
