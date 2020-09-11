const { DataTypes } = require('sequelize')
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
	// defino el modelo
	sequelize.define('product', {
		name: {
			type: DataTypes.STRING,
			allowNull: false,
		},
		description: {
			type: DataTypes.TEXT,
			allowNull: false,
		},
		price: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		stock: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		image: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
			allowNull: false,
		},
		// CONSULTAR EN SI EN EL MODELO DE LA DB PRODUCTO NO LE TENGGO QUE ASIGNAR LA CATEGORIA
		category: {
			type: DataTypes.ARRAY(DataTypes.TEXT),
			allowNull: false,
		}

	})
}
