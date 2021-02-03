const Disponibilidade = require('../models').Disponibilidade
const Usuario = require('../models').Usuarios
const db = require('../models')

module.exports = {
  async createDisponibilidade(req, resp) {
    const {dtInicio, dtTermino, usuarioId, areaId} = req.params

    if(usuarioId){
      await db.sequelize.query(`SELECT insertHorarios(${9},${18},${areaId},${usuarioId})`)
    }else{
      await db.sequelize.query(
        `SELECT insertHorarios(${dtInicio},${dtTermino},${areaId}, null)`,
      )
    }

    return resp.status(200).json({msg: "criado"})
  },
}
