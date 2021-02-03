const Router = require('express').Router
const router = Router()
const UsuariosController = require('../controllers/UsuariosController')
const { ensureAuth } = require('../middlewares/ensureAuth')

router.post('/:condominioId', UsuariosController.createUser)
// retorna lista com nome de todos os users do predio
router.get('/:condominioId/:usuarioId', ensureAuth, UsuariosController.getUsers)

router.get('/getOne/:usuarioId', ensureAuth, UsuariosController.getOneUser)

router.delete('/:usuarioId', ensureAuth, UsuariosController.deleteUser)

router.put('/:usuarioId', UsuariosController.updateUser)
module.exports = router
