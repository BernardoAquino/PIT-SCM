'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Gastos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Gastos.belongsTo(models.Condominios, {
        targetKey: 'id',
        foreignKey: 'condominioId',
      })
    }
  }
  Gastos.init(
    {
      comprovante: {
        type: DataTypes.STRING(200),
        allowNull: false,
      },
      valorTotal: {
        allowNull: false,
        type: DataTypes.DOUBLE,
      },
      categoriaGasto: {
        allowNull: false,
        type: DataTypes.STRING(50),
      },
      mes: {
          allowNull: false,
          type: DataTypes.INTEGER
      }
    },
    {
      sequelize,
      modelName: 'Gastos',
    },
  )
  return Gastos
}
