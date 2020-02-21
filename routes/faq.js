const router = require('express').Router()

/** Controllers */
const { FaqController } = require('../controllers')

/** Routes */
router.get('/', (req, res) => FaqController.getContent(req, res))
router.post('/', (req, res) => FaqController.postContent(req, res))

router.get('/:file', (req, res) => FaqController.getFile(req, res))
router.post('/:file', (req, res) => FaqController.postFile(req, res))
router.delete('/:file', (req, res) => FaqController.removeFile(req, res))

module.exports = router
