const express = require('express')

const router = express.Router()

/** Controllers */
const { HomeController } = require('../controllers')

/** ROUTES */
router.get('/', HomeController.index)

module.exports = router
