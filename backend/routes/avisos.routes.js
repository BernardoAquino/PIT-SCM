const Router = require('express').Router
const router = Router()
const AvisosController = require('../controllers/AvisosController')
const uploadConfig = require('../config/upload')
const multer = require('multer')
const upload = multer(uploadConfig)
const { ensureAuth } = require('../middlewares/ensureAuth')

router.post('/:usuarioId', ensureAuth, upload.single('img'),AvisosController.createAviso)

router.get('/:condominioId', ensureAuth, AvisosController.getAvisos)

router.delete('/:avisoId', ensureAuth, AvisosController.deleteAviso)

router.put('/:avisoId', ensureAuth, upload.single('img'), AvisosController.updateAviso)

module.exports = router
