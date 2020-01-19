const BaseController = require('./BaseController')

class BlogController extends BaseController {
  async news (req, res) {
    return res.json(await this._readJSONFromStorage('blog/news.json'))
  }

  async content (req, res) {
    return res.json(await this._readJSONFromStorage('blog/content.json'))
  }

  async file (req, res) {
    const fileData = await this._readTextFromStorage(`blog/content/${req.params.file}`)
    if (!fileData) return res.send(this.http2.constants.HTTP_STATUS_NOT_FOUND)
    return res.send(fileData)
  }
}

module.exports = new BlogController()
