class HomeController {
  async index (req, res) {
    return res.json({ name: 'Maxim' })
  }
}

module.exports = new HomeController()
