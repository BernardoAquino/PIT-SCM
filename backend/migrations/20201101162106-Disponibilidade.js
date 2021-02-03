'use strict'
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Disponibilidade', {
      id: {
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      horario: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      estaOcupado: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
      },
      areaId: {
        allowNull: false,
        type: Sequelize.INTEGER.UNSIGNED,
      },
      usuarioId: {
        allowNull: true,
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
    await queryInterface.dropTable('Disponibilidade')
  },
}

