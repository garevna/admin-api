const router = require('express').Router()

/** Controllers */
const { EmailController } = require('../controllers')
/** Requests */
const { MailRequest } = require('../requests')

/** Routes */
router.post('/', MailRequest.validate(), (req, res) => EmailController.create(req, res))

module.exports = router
