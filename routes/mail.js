const router = require('express').Router()

/** Controllers */
const { EmailController } = require('../controllers')
/** Requests */
const { EmailRequest } = require('../requests')

/** Routes */
router.post('/', (req, res) => EmailController.create(req, res))

module.exports = router
