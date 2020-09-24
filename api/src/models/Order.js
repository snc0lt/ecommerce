const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    state: {
      type: DataTypes.ENUM('carrito', 'creada', 'cancelada', 'procesando', 'completa','despacho'),
      defaultValue: 'carrito',
    }
  });
};