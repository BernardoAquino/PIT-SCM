'use strict'
const { Sequelize } = require('sequelize')
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Condominios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Condominios.init(
    {
      cidade: DataTypes.STRING(50),
      bairro: DataTypes.STRING(50),
      numero: DataTypes.STRING(20),
      uf: DataTypes.CHAR(2),
      cep: DataTypes.CHAR(11),
    },
    {
      sequelize,
      modelName: 'Condominios',
    },
  )
  return Condominios
}
