const BaseController = require('./BaseController')

class BlogController extends BaseController {
	async index (req, res) {
		return res.json(await this._readFileFromStorage('blog/news.json'))
	}
}

module.exports = new BlogController()
