'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Documentos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Documentos.belongsTo(models.Condominios, {
        targetKey: 'id',
        foreignKey: 'condominioId',
      })
    }
  }
  Documentos.init(
    {
      titulo: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      caminho: {
        allowNull: false,
        type: DataTypes.STRING(240),
      },
      descricao:{
          allowNull: false,
          type: DataTypes.STRING(200)
      },
    },
    {
      sequelize,
      modelName: 'Documentos',
    },
  )
  return Documentos
}
