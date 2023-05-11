const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: { type: DataTypes.UUID, primaryKey: true },
    name: { type: DataTypes.STRING(50), allowNull: false },
    description: { type: DataTypes.STRING, allowNull: false },
    image: { type: DataTypes.STRING, allowNull: false },
    released: { type: DataTypes.DATEONLY, allowNull: false },
    rating: { type: DataTypes.INTEGER, allowNull: false,
      validate: {
        min: 1,
        max: 10,
      },
    },
  });
};
