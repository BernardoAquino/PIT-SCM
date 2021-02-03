const Gasto = require('../models').Gastos

module.exports = {
  // create
  async createGasto(req, resp) {
    try {
      const { condominioId } = req.params

      const comprovante = req.file.filename

      const { valorTotal, categoriaGasto, mes } = req.body

      const gasto = await Gasto.create({
        comprovante,
        valorTotal,
        categoriaGasto,
        mes,
        condominioId,
      })

      return resp.status(200).json(gasto)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // get
  async getGastos(req, resp) {
    try {
      const { condominioId } = req.params

      const gastos = await Gasto.findAll({ where: { condominioId }, order: [['mes', 'DESC']] })

      return resp.status(200).json(gastos)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // delete
  async deleteGasto(req, resp) {
    try {
      const { gastoId } = req.params

      await Gasto.destroy({ where: { id: gastoId } })

      return resp.status(200).json({ msg: 'Gasto deletado' })
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // update
  async updateGasto(req, resp) {
    try {
      const { gastoId } = req.params

      const { comprovante, valorTotal, categoriaGasto, mes } = req.body

      const gasto = await Gasto.update(
        {
          comprovante,
          valorTotal,
          categoriaGasto,
          mes: parsedDate,
        },
        { where: { id: gastoId } },
      )

      return resp.status(200).json(gasto)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
}
