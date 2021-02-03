const Documento = require('../models').Documentos

module.exports = {
  // create
  async createDocumento(req, resp) {
    try {
      const { condominioId } = req.params

      const { titulo, descricao } = req.body

      const caminho = req.file.filename

      const documento = await Documento.create({
        caminho,
        titulo,
        descricao,
        condominioId,
      })

      return resp.status(200).json(documento)
    } catch (error) {
      console.log(error)
      return resp.status(500).json(error)
    }
  },
  // update
  async updateDocumento(req, resp) {
    try {
      const { documentoId } = req.params

      const { titulo, descricao } = req.body

      const caminho = req.file.filename

      const documento = await Documento.update(
        {
          caminho,
          titulo,
          descricao,
        },
        {
          where: { id: documentoId },
        },
      )

      return resp.status(200).json(documento)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // get
  async getDocumentos(req, resp) {
    try {
      const { condominioId } = req.params

      const documentos = await Documento.findAll({ where: { condominioId } })

      return resp.status(200).json(documentos)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // delete
  async deleteDocumento(req, resp) {
    try {
      const { documentoId } = req.params

      await Documento.destroy({ where: { id: documentoId } })

      return resp.status(200).json({msg: 'Documento deletado'})
    } catch (error) {

      return resp.status(500).json(error)
      
    }
  },
}
