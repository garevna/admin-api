const http2 = require('http2')
const { validationResult } = require('express-validator')


class ControllerFactory {
  constructor (ControllerClass) {
    return new Proxy((new ControllerClass()), this.handler())
  }

  handler () {
    return {
      get (target, prop, receiver) {
        const targetValue = Reflect.get(target, prop, receiver)

        if (typeof targetValue === 'function') {
          return (...args) => {
            const [req, res] = args
            if (req['express-validator#contexts']) {
              const errors = validationResult(req)
              if (!errors.isEmpty()) {
                return res.status(http2.constants.HTTP_STATUS_UNPROCESSABLE_ENTITY).json({ errors: errors.array() })
              }
            }

            return targetValue.apply(target, args)
          }
        }

        return targetValue
      }
    }
  }
}

module.exports = ControllerFactory
