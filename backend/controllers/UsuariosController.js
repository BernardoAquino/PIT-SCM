const bcrypt = require('bcryptjs')
const datefns = require('date-fns')
const Usuario = require('../models/index').Usuarios
const Condominio = require('../models/index').Condominios
var Sequelize = require('sequelize')
const Op = Sequelize.Op

module.exports = {
  // criacao de condomino
  async createUser(req, resp) {
    try {
      const { nome, email, telefone, senha, cpf, dtNasc, avatar } = req.body
      // id do sindico
      const { condominioId } = req.params

      const condomino = await Usuario.findOne({
        where: { email },
      })
      // checando se condomino ja existe
      if (condomino) {
        return resp
          .status(400)
          .json({ error: 'Este email já está vínculado à uma conta.' })
      }
      // encriptando senha
      const hashedPassword = await bcrypt.hash(senha, 10)

      const parsedDate = datefns.parseISO(dtNasc)

      const usuario = await Usuario.create({
        nome,
        email,
        telefone,
        senha: hashedPassword,
        avatar,
        cpf,
        dtNasc: parsedDate,
        tipoUsuario: 0,
        condominioId,
      })

      return resp.json(usuario)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  // get usuarios
  async getUsers(req, resp) {
    try {
      const { condominioId, usuarioId } = req.params
      // todos os usuarios
      const usuarios = await Usuario.findAll({
        where: {
          [Op.and]: [{ condominioId }, { id: { [Op.ne]: usuarioId } }],
        },
      })
      // retornando somente o nome dos usuarios
      return resp.status(200).json(usuarios)
    } catch (error) {
      console.log(error)
      return resp.status(500).json(error)
    }
  },
  async getOneUser(req, resp) {
    try {
      const { usuarioId } = req.params

      const usuario = await Usuario.findOne({ where: { id: usuarioId } })

      delete usuario.senha

      return resp.status(200).send(usuario)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
  async deleteUser(req, resp) {
    try {
      const { usuarioId } = req.params

      Usuario.destroy({ where: { id: usuarioId } })

      return resp.status(200).json({ msg: 'Usuário deletado' })
    } catch (error) {
      return resp.status(500).json()
    }
  },
  async updateUser(req, resp) {
    try {
      const { usuarioId } = req.params

      const { nome, email, telefone, senha, cpf, dtNasc, avatar } = req.body

      const hashedPassword = await bcrypt.hash(senha, 10)

      const parsedDate = datefns.parseISO(dtNasc)

      const usuario = await Usuario.update(
        {
          nome,
          email,
          telefone,
          senha: hashedPassword,
          avatar,
          cpf,
          dtNasc: parsedDate,
          condominioId,
        },
        {
          where: { id: usuarioId },
        },
      )

      return resp.status(200).json(usuario)
    } catch (error) {
      return resp.status(500).json(error)
    }
  },
}
