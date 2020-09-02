const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('order', {
    state: {
      type: DataTypes.ENUM('carrito', 'creada', 'cancelada', 'procesando', 'completa'),
      defaultValue: 'carrito',
    },
    fecha: {
        type: DataTypes.DATEONLY,
        allowNull: false

    },
    direccion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    mail: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        },
      }
  });
};

