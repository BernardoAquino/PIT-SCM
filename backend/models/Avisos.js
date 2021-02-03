'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Avisos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Avisos.belongsTo(models.Condominios, {
        targetKey: 'id',
        foreignKey: 'condominioId',
      })
      Avisos.belongsTo(models.Usuarios, {
        targetKey: 'id',
        foreignKey: 'usuarioId',
      })
    }
  }
  Avisos.init(
    {
      img: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      mensagem: {
        allowNull: false,
        type: DataTypes.STRING(240),
      },
    },
    {
      sequelize,
      modelName: 'Avisos',
    },
  )
  return Avisos
}
