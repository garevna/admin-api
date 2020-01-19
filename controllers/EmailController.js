const nodemailer = require('nodemailer')
const BaseController = require('./BaseController')

class EmailController extends BaseController {
  constructor () {
    super()

    this.transport = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.GMAIL,
        pass: process.env.GMAIL_PASS
      }
    })
  }

  create (req, res) {
    if (!req.body.email || !this.validMail(req.body.email)) { return res.json({ error: 'Invalid email' }) }

    const params = {
      email: req.body.email,
      username: req.body.username || req.body.name || 'guest',
      subject: req.body.subject || 'DGTek',
      html: req.body.html || req.body.text || 'Tanks for your message'
    }

    this.sendEmail(params, res)

    params.email = 'info@dgtek.net'
    params.subject = 'Contact info'
    params.html = `<h3>user: ${params.username}</h3>
        <p>phone: ${req.body.phone}</p>
        <p>email: ${req.body.email}</p>
        <h4>Message:</h4>
        <p>${req.body.message}</p>
      `
    return this.sendEmail(params, res)
  }

  validMail (email) {
    return Boolean(email.match(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/))
  }

  async sendEmail (params, res) {
    this.transport.sendMail({
      from: process.env.GMAIL,
      to: params.email,
      subject: params.subject,
      html: params.html
    })
    return res.json(params)
  }
}

module.exports = new EmailController()
