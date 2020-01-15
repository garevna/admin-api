const express = require('express')

const router = express.Router()

/** Controllers */
const { HomeController } = require('../controllers')

/** Routes */
router.get('/', HomeController.index)

module.exports = router
