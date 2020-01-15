const router = require('express').Router()

/** Controllers */
const { BlogController } = require('../controllers')

/** Routes */
router.get('/news', (req, res) => BlogController.index(req, res))

module.exports = router
