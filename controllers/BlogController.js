const { readFile } = require('../helpers')

class BlogController {
	index (req, res) {
		readFile(`${__dirname}/../storage/blog/news/`, 'news.json')
			.then((json) => res.send(json))
			.catch((err) => res.json({ error: err.message }))
	}
}

module.exports = new BlogController()
