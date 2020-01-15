const router = require('express').Router()

/** Controllers */
const { BlogController } = require('../controllers')

/** Routes */
router.get('/news', BlogController.index)

module.exports = router
