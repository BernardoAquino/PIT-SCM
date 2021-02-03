const Router = require('express').Router
const router = Router()
const AreasController = require('../controllers/AreasController')
const { ensureAuth } = require('../middlewares/ensureAuth')

router.post('/:condominioId', ensureAuth, AreasController.createArea)

router.get('/:condominioId', ensureAuth, AreasController.getAreas)

router.delete('/:areaId', ensureAuth, AreasController.deleteAreas)

module.exports = router
