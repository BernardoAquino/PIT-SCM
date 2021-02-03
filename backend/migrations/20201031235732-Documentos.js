'use strict'

const { sequelize } = require("../models")

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Documentos', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      titulo: {
        type: Sequelize.STRING(200),
        allowNull: true,
      },
      caminho: {
        allowNull: false,
        type: Sequelize.STRING(240),
      },
      descricao: {
        allowNull: false,
        type: Sequelize.STRING(200),
      },
      condominioId: {
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
    await queryInterface.dropTable('Documentos')
  },
}
