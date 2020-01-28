const { ControllerFactory } = require('../lib')

class HomeController {
  async index (req, res) {
    return res.json({ message: 'api' })
  }
}

module.exports = new ControllerFactory(HomeController)
