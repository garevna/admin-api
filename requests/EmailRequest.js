const { body } = require('express-validator')

class MailRequest {
  get create () {
    return [
      body('email', 'Invalid email address').isEmail(),
      body('name').isString().isLength({ min: 2 }),
      body('phone').isString().isLength({ min: 5 }),
      body('message').isString().isLength({ min: 10 })
    ]
  }
}

module.exports = new MailRequest()
