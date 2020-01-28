const http2 = require('http2')

const { ControllerFactory } = require('../lib')
const { readTextFromStorage, readJSONFromStorage } = require('../helpers')

class BlogController {
  async news (req, res) {
    return res.json(await readJSONFromStorage('blog/news.json'))
  }

  async content (req, res) {
    return res.json(await readJSONFromStorage('blog/content.json'))
  }

  async file (req, res) {
    const fileData = await readTextFromStorage(`blog/content/${req.params.file}`)
    if (!fileData) return res.send(http2.constants.HTTP_STATUS_NOT_FOUND)
    return res.send(fileData)
  }
}

module.exports = new ControllerFactory(BlogController)
