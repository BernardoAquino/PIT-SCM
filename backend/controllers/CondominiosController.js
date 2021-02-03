const Condominio = require('../models/index').Condominios
const Usuario = require('../models/index').Usuarios
const bcrypt = require('bcryptjs')
const datefns = require('date-fns')
module.exports = {
  // criação de condominio e conta de sindico
  async createCondominio(req, resp) {
    try {
      const {
        cidade,
        bairro,
        numero,
        uf,
        cep,
        nome,
        email,
        avatar,
        telefone,
        senha,
        cpf,
        dtNasc,
      } = req.body

      const condominio = await Condominio.create({
        cidade,
        bairro,
        numero,
        uf,
        cep,
      })

      const usuarioExists = await Usuario.findOne({
        where: { email },
      })

      if (usuarioExists) {
        return resp
          .status(400)
          .json({ error: 'Este email já está vínculado à uma conta.' })
      }
      const hashedPassword = await bcrypt.hash(senha, 10)

      const parsedDate = datefns.parseISO(dtNasc)

      const usuario = await Usuario.create({
        nome,
        email,
        telefone,
        senha: hashedPassword,
        cpf,
        dtNasc: parsedDate,
        tipoUsuario: 1,
        condominioId: condominio.id,
      })

      return resp.status(200).json(usuario)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
}
