const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('genre', {
        id: { type: DataTypes.UUID, primaryKey: true },
        nombre: { type: DataTypes.STRING, allowNull: false },
    })
}