const Router = require('express').Router
const routes = Router()
const usuarios = require('./usuarios.routes')
const condominios = require('./condominios.routes')
const auth = require('./auth.routes')
const avisos = require('./avisos.routes')
const documentos = require('./documentos.routes')
const gastos = require('./gastos.routes')
const comentarios = require('./comentarios.routes')
const areas = require('./areas.routes')
const disponibilidades = require('./disponiblidade.routes')

routes.use('/comentarios', comentarios)

routes.use('/gastos', gastos)

routes.use('/documentos', documentos)

routes.use('/avisos', avisos)

routes.use('/usuarios', usuarios)

routes.use('/condominios', condominios)

routes.use('/disponibilidades', disponibilidades)

routes.use('/areas', areas)

routes.use('/auth', auth)

module.exports = routes
