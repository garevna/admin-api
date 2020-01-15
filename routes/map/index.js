const router = require('express').Router()

const { readFile } = require('../../helpers')

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
