'use strict'
const { Model } = require('sequelize')
module.exports = (sequelize, DataTypes) => {
  sequelize.query(deleteHorario)
  sequelize.query(insertHorario)

  class Disponibilidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Disponibilidade.belongsTo(models.Condominios, {
      targetKey: 'id',
        foreignKey: 'condominioId',
      })

      Disponibilidade.belongsTo(models.Areas, {
        targetKey: 'id',
        foreignKey: 'areaId',
      })
    }
  }
  Disponibilidade.init(
    {
      horario: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      estaOcupado: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: 'Disponibilidade',
    },
  )
  return Disponibilidade
}

const deleteHorario = 'DROP FUNCTION IF EXISTS `insertHorarios`'
const insertHorario ="CREATE FUNCTION `insertHorarios`(dt_inicio INT, dt_termino INT, areaId INT, condominioId INT) RETURNS INT(11) BEGIN \
    DECLARE dia DATETIME DEFAULT CURDATE(); DECLARE hora INT ; \
    SET \
        hora = dt_inicio ; WHILE(hora <= dt_termino) \
    DO \
    INSERT INTO Disponibilidade( id, horario, estaOcupado, areaId, usuarioId, createdAt, updatedAt) \
VALUES( \
    NULL, \
    DATE_ADD(dia, INTERVAL hora HOUR), \
    FALSE, \
    areaId, \
    condominioId, \
    CURDATE(), \
    CURDATE() \
) ; \
SET \
    hora = hora + 1 ; \
        END WHILE ; RETURN hora ; END \
"