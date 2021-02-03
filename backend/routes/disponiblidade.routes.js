const Router = require('express').Router
const router = Router()
const DisponibilidadeController = require('../controllers/DisponibilidadeController')
const {ensureAuth} = require('../middlewares/ensureAuth')

router.post('/:areaId/:usuarioId?', ensureAuth, DisponibilidadeController.createDisponibilidade)

module.exports = router
