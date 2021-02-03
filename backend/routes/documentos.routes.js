const Router = require('express').Router
const router = Router()
const DocumentosController = require('../controllers/DocumentosController')
const uploadConfig = require('../config/upload')
const multer = require('multer')
const upload = multer(uploadConfig)
const { ensureAuth } = require('../middlewares/ensureAuth')

router.post(
  '/:condominioId',
  ensureAuth,
  upload.single('doc'),
  DocumentosController.createDocumento,
)

router.get('/:condominioId', ensureAuth, DocumentosController.getDocumentos)

router.delete('/:documentoId', ensureAuth, DocumentosController.deleteDocumento)

router.put(
  '/:documentoId',
  ensureAuth,
  upload.single('doc'),
  DocumentosController.updateDocumento,
)
module.exports = router
