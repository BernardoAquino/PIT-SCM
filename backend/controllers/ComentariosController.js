const Comentario = require('../models').Comentarios
const Usuario = require('../models').Usuarios

module.exports = {
  async createComentario(req, resp) {
    //create
    try {
      const { usuarioId, avisoId } = req.params

      const { mensagem } = req.body

      const comentario = await Comentario.create({
        mensagem,
        usuarioId,
        avisoId,
      })

      return resp.status(200).json(comentario)

    } catch (error) {

      return resp.status(500).json(error)

    }
  },
  // get
  async getComentarios(req, resp) {
    try {
      const { avisoId } = req.params

      const comentarios = await Comentario.findAll({
        include: [{
          model: Usuario,
          required: true
        }],
        where: { avisoId },
        order: [['createdAt', 'DESC']],
      })

      return resp.status(200).json(comentarios)

    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // delete
  async deleteComentario(req, resp) {
    try {
      const { comentarioId } = req.params

      await Comentario.destroy({ where: { id: comentarioId } })

      return resp.status(200).json({ msg: 'Comentário deletado' })
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // update
  async updateComentario(req, resp) {
    try {
      const { comentarioId, usuarioId } = req.params

      const { mensagem } = req.body

      const comentario = await Comentario.update(
        {
          mensagem,
        },
        {
          where: { id: comentarioId, usuarioId },
        },
      )

      return resp.status(200).json(comentario)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
}
