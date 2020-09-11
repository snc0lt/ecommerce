const server = require('express').Router();
const { Op } = require('sequelize');
const { Product} = require('../db.js');


server.get('/', (req, res) => {
	if (req.query.search) {
		const value = req.query.search;
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
				stock: {
					[Op.gt]: 0,
				}  
			},
		}).then((products) => {
			if (products.length == 0) {
				res.status(404).send({msg: 'No se encontro ningun producto'});
			} else {
				res.status(200).send(products)
			}
		})
	} else {
		Product.findAll({
			include: [Category],
			where: {
				stock: {
					[Op.gt]: 0,
				}  
			}
		}).then((products) => res.send(products))
	}
});


module.exports = server

