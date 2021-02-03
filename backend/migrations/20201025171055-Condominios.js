'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Condominios', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false
      },
      cidade: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      bairro: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },
      numero: {
        type: Sequelize.STRING(20),
        allowNull: false,
      },
      uf: {
        type: Sequelize.STRING(2),
        allowNull: false,
      },
      cep: {
        type: Sequelize.STRING(11),
        allowNull: false,
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
    await queryInterface.dropTable('Condominios')
  },
}
