const Router = require('express').Router
const router = Router()
const GastosController = require('../controllers/GastosController')
const { ensureAuth } = require('../middlewares/ensureAuth')
const uploadConfig = require('../config/upload')
const multer = require('multer')
const upload = multer(uploadConfig)

router.post(
  '/:condominioId',
  ensureAuth,
  upload.single('comprovante'),
  GastosController.createGasto,
)

router.get('/:condominioId', ensureAuth, GastosController.getGastos)

router.delete('/:gastoId', ensureAuth, GastosController.deleteGasto)

router.put('/', ensureAuth, GastosController.updateGasto)

module.exports = router
