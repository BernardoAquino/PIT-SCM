'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Avisos', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      img: {
        allowNull: true,
        type: Sequelize.STRING(200),
      },
      mensagem: {
        allowNull: false,
        type: Sequelize.STRING(240),
      },
      condominioId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      usuarioId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
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
    await queryInterface.dropTable('Avisos')
  },
}