const Area = require('../models').Areas
const Disponibilidade = require('../models').Disponibilidades
const Usuario = require('../models').Usuarios
const db = require('../models')

module.exports = {
  // create
  async createArea(req, resp) {
    try {
      const { condominioId } = req.params

      const { nome } = req.body

      const areas = await Area.create({
        nome,
        condominioId,
      })

      return resp.status(200).json(areas)
    } catch (error) {
      console.log(error);
      return resp.status(500).json(error)
    }
  },
  async createDisponibilidade(req, resp) {
    try {
      const { usuarioId } = req.params;
      const { dtInicio, dtTermino, areaId } = req.body

      if (usuarioId) {
        await db.sequelize.query(
          `SELECT insertHorarios(${dtInicio},${dtTermino},${areaId},${usuarioId})`,
        )
      } else {
        await db.sequelize.query(
          `SELECT insertHorarios(${dtInicio},${dtTermino},${areaId}, null)`,
        )
      }

      return resp.status(200).json({ msg: 'criado' })
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // get
  async getAreas(req, resp) {
    try {
      const { condominioId } = req.params

      const areas = await Area.findAll({
        where: { condominioId },
      })

      return resp.status(200).json(areas)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // delete
  async deleteAreas(req, resp) {
    try {
      const { areaId } = req.params

      await Area.destroy({ where: { id: areaId } })

      return resp.status(200).json({ msg: 'Area deletada' })
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
}
