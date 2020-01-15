const express = require('express')

const router = express.Router()

const bodyParser = require('body-parser')

router.use(bodyParser.json())

const readFile = require('../readFile.js')

function errorHandler (err, res) {
	console.warn(err)
	res.json({ error: err })
}

router.get('/markers', (req, res) => {
	readFile(__dirname, '/markers.json')
		.then((json) => res.send(json))
		.catch((err) => errorHandler(err, res))
})
router.get('/polygons', (req, res) => {
	readFile(__dirname, '/polygons.json')
		.then((json) => res.send(json))
		.catch((err) => errorHandler(err, res))
})
router.get('/points', (req, res) => {
	readFile(__dirname, '/points.json')
		.then((json) => res.send(json))
		.catch((err) => errorHandler(err, res))
})

module.exports = router
