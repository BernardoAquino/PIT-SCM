'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Usuarios', {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
      },
      nome: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      email: {
        type: Sequelize.STRING(50),
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      avatar: {
        allowNull: true,
        type: Sequelize.STRING(200),
        defaultValue: "avatar"
      },
      telefone: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      cpf: {
        type: Sequelize.STRING(14),
        allowNull: false,
      },
      senha: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },
      dtNasc: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      tipoUsuario: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      condominioId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    })
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Usuarios')
  },
}
