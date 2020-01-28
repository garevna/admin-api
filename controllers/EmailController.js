const nodemailer = require('nodemailer')

const { ControllerFactory } = require('../lib')
const { generateHTMLFromTemplate } = require('../helpers')

class EmailController {
  constructor () {
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

  async create (req, res) {
    const { email, name, phone, message } = req.body
    /** Send Email To User */
    const subject = 'DGTEK.NET - Thank You For Contacting Us'
    const userParams = { email, name, subject, phone, message }
    const userHtml = await generateHTMLFromTemplate(`${__dirname}/../templates/userMail.hbs`, userParams)
    await this.sendEmail({ ...userParams, html: userHtml })

    /** Send Email To Support */
    const supportParams = { email: 'dgtek.noreply@gmail.com', subject: `Contact info - ${email}`, message, phone }
    const supportHtml = await generateHTMLFromTemplate(`${__dirname}/../templates/supportMail.hbs`, supportParams)
    await this.sendEmail({ ...supportParams, html: supportHtml })

    /** Return JSON message */
    return res.json({ message: 'Email sent successfully' })
  }

  async sendEmail (params) {
    const { email, subject, html } = params
    const info = await this.transport.sendMail({ from: process.env.GMAIL, to: email, subject, html })
    return info
  }
}

module.exports = new ControllerFactory(EmailController)
