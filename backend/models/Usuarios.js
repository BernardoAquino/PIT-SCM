'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Usuarios.belongsTo(models.Condominios, {
        targetKey: 'id',
        foreignKey: 'condominioId',
      })
    }
  }
  Usuarios.init(
    {
      nome: DataTypes.STRING(50),
      email: {
        type: DataTypes.STRING(120),
        unique: true,
      },
      avatar: {
        allowNull: true,
        type: DataTypes.STRING(200),
      },
      telefone: DataTypes.STRING(20),
      senha: DataTypes.STRING(100),
      dtNasc: DataTypes.DATE,
      cpf: DataTypes.STRING(14),
      tipoUsuario: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Usuarios',
    },
  )
  return Usuarios
}
