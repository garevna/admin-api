const router = require('express').Router()

/** Controllers */
const { EmailController } = require('../controllers')

/** Routes */
router.post('/', (req, res) => {
  if (!req.body.email || !EmailController.validMail(req.body.email)) {
    return res.json({ error: 'Invalid email' })
  }

  const params = {
    email: req.body.email,
    username: req.body.username || req.body.name || 'guest',
    subject: req.body.subject || 'DGTek',
    html: req.body.html || req.body.text
  }

  EmailController.sendEmail(params, res)

  params.email = 'info@dgtek.net'
  params.subject = 'Contact info'
  params.html = `<h3>user: ${params.username}</h3>
    <p>phone: ${req.body.phone || ''}</p>
    <p>email: ${req.body.email}</p>
    <h4>Message:</h4>
    <p>${req.body.message || ''}</p>
  `
  EmailController.sendEmail(params, res)

  return res.sendStatus(200)
})

module.exports = router
