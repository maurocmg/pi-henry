const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    sequelize.define('platform', {
        id: { type: DataTypes.UUID, primaryKey: true },
        name: { type: DataTypes.STRING(40), allowNull: false },
    })
}