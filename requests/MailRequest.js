const { check } = require('express-validator')
const BaseRequest = require('./BaseRequest')

class MailRequest extends BaseRequest {
  rules () {
    return [
      check('email').isEmail()
    ]
  }
}

module.exports = new MailRequest()
