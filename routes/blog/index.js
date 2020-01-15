const express = require('express')

const router = express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser.json())

const readFile = require('../readFile.js')

function errorHandler (err, res) {
	console.warn(err)
	res.json({ error: err })
}

router.get('/news', (req, res) => {
	readFile('./routes/blog/news/', 'news.json')
		.then((json) => res.send(json))
		.catch((err) => errorHandler(err, res))
})

module.exports = router
