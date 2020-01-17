const BaseController = require('./BaseController')

class BlogController extends BaseController {
	async news (req, res) {
		return res.json(await this._readJSONFromStorage('blog/news.json'))
	}

	async content (req, res) {
		return res.json(await this._readJSONFromStorage('blog/content.json'))
	}

	async file (req, res) {
		return res.send(await this._readTextFromStorage(`blog/content/${req.params.file}`))
	}
}

module.exports = new BlogController()
