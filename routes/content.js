const express = require('express')

const router = express.Router()

const { readFile, getFullContent } = require('../helpers')


router.get('/', (req, res) => {
	getFullContent(
		'./routes/content/files',
		(err) => res.json(err)
	).then((response) => res.json(response))
})

// router.get('/:folder/:fileName', bodyParser.text({ type: '*/*' }), (req, res) => {
// 	readFile(`./routes/content/files/${req.params.folder}/`, req.params.fileName)
// 		.then((content) => res.send(content))
// 		.catch((err) => console.warn(err))
// })

router.get('/:folder/:subfolder/:fileName', (req, res) => {
	readFile(`./routes/content/files/${req.params.folder}/${req.params.subfolder}/`, req.params.fileName)
		.then((content) => res.send(content))
		.catch((err) => console.warn(err))
})

router.get('/:file', (req, res) => {
	readFile('./routes/content/files/', req.params.file)
		.then((content) => res.send(content))
		.catch((err) => res.json({ error: 'File not found' }))
})

// router.post('/:file', bodyParser.text({ type: '*/*' }), (req, res) => {
// 	fs.writeFile(`./routes/content/files/${req.params.file}`, req.body, (error) => {
// 		if (error) return errorHandler(error, res)
// 		return res.json({ status: 'OK' })
// 	})
// })

// router.post('/:folder/:file', bodyParser.text({ type: '*/*' }), (req, res) => {
// 	fs.writeFile(`./routes/content/files/${req.params.folder}/${req.params.file}`, req.body, (error) => {
// 		if (error) return errorHandler(error, res)
// 		return res.json({ status: 'OK' })
// 	})
// })

// router.post('/:folder/:subfolder/:file', bodyParser.text({ type: '*/*' }), (req, res) => {
// 	fs.writeFile(`./routes/content/files/${req.params.folder}/${req.params.subfolder}/${req.params.file}`, req.body, (error) => {
// 		if (error) return errorHandler(error, res)
// 		return res.json({ status: 'OK' })
// 	})
// })


module.exports = router
