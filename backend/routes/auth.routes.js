const Router = require('express').Router
const router = Router()
const AuthController = require('../controllers/AuthController')

router.post('/', AuthController.authUser)

module.exports = router
