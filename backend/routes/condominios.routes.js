const Router = require('express').Router
const router = Router()
const CondominiosController = require('../controllers/CondominiosController')

router.post('/', CondominiosController.createCondominio)

module.exports = router
