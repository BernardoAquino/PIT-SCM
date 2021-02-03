'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Gastos', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      comprovante: {
        type: Sequelize.STRING(200),
        allowNull: false,
      },
      valorTotal: {
        allowNull: false,
        type: Sequelize.DOUBLE,
      },
      categoriaGasto: {
        allowNull: false,
        type: Sequelize.STRING(50),
      },
      mes: {
          allowNull: false,
          type: Sequelize.INTEGER
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
    await queryInterface.dropTable('Gastos')
  },
}
