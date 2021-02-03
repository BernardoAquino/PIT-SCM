const fromUnixTime = require('date-fns').fromUnixTime
const compare = require('bcryptjs').compare
const signToken = require('jsonwebtoken').sign
const authConfig = require('../config/auth')
const Usuario = require('../models').Usuarios

module.exports = {
  async authUser(req, resp) {
    const { email, senha } = req.body
    // procurando user
    const usuario = await Usuario.findOne({
      where: { email },
    })
    // verificando se user existe
    if (!usuario) {
      return resp.status(401).json({ error: 'E-mail incorreto' })
    }
    // comparando senhas
    const passwordMatch = await compare(senha, usuario.senha)

    if (!passwordMatch) {
      return resp.status(401).json({ error: 'Senha ou E-mail incorreto(a)' })
    }
    // payload do token(informacoes nao sensiveis)
    const token = signToken({}, authConfig.jwt.secret, {
      subject: String(usuario.id),
      expiresIn: authConfig.jwt.expiresIn,
    })
    // Usuario autenticado
    return resp.json({ usuario, token })
  },
}
