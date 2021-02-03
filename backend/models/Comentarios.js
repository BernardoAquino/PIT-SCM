'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Comentarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comentarios.belongsTo(models.Avisos, {
        targetKey: 'id',
        foreignKey: 'avisoId',
      })
      Comentarios.belongsTo(models.Usuarios, {
        targetKey: 'id',
        foreignKey: 'usuarioId',
      })
    }
  }
  Comentarios.init(
    {
      mensagem: {
        type: DataTypes.STRING(240),
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Comentarios',
    },
  )
  return Comentarios
}
