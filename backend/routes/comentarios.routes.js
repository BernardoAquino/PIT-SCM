const Router = require('express').Router
const router = Router()
const ComentariosController = require('../controllers/ComentariosController')
const { ensureAuth } = require('../middlewares/ensureAuth')

router.post('/:avisoId/:usuarioId', ensureAuth, ComentariosController.createComentario)

router.get('/:avisoId', ensureAuth, ComentariosController.getComentarios)

router.delete('/:comentarioId', ensureAuth, ComentariosController.deleteComentario)

router.put('/:comentarioId/:usuarioId', ensureAuth, ComentariosController.updateComentario)

module.exports = router
