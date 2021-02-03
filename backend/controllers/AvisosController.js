const Aviso = require('../models').Avisos
const Usuario = require('../models').Usuarios

module.exports = {
  // create
  async createAviso(req, resp) {
    try {
      const { mensagem } = req.body

      const img = req.file.filename

      const { usuarioId } = req.params
      // pegando condominioId pelo userId
      const usuario = await Usuario.findOne({ where: { id: usuarioId } })

      const aviso = await Aviso.create({
        img,
        mensagem,
        condominioId: usuario.condominioId,
        usuarioId,
      })

      return resp.status(200).json(aviso)
    } catch (error) {
      console.log(error)
      return resp.status(500).json(error)
    }
  },
  // get
  async getAvisos(req, resp) {
    try {
      const { condominioId } = req.params

      const avisos = await Aviso.findAll({ where: { condominioId }, order: [['createdAt', 'DESC']] })

      return resp.status(200).json(avisos)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // delete
  async deleteAviso(req, resp) {
    try {
      const { avisoId } = req.params

      await Aviso.destroy({ where: { id: avisoId } })

      return resp.status(200).json({ msg: 'Aviso deletado' })
    } catch (error) {
      console.log(error)
      return resp.status(500).json(error)
    }
  },
  // update
  async updateAviso(req, resp) {
    try {
      const { avisoId } = req.params

      const { img, mensagem } = req.body

      const aviso = await Aviso.update(
        {
          img,
          mensagem,
        },
        {
          where: { id: avisoId },
        },
      )

      return resp.status(200).json(aviso)

    } catch (error) {

      return resp.status(500).json(error)

    }
  },
}
