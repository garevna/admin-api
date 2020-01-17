const router = require('express').Router()

/** Controllers */
const { BlogController } = require('../controllers')

/** Routes */
router.get('/news', (req, res) => BlogController.news(req, res))
router.get('/content', (req, res) => BlogController.content(req, res))
router.get('/content/:file', (req, res) => BlogController.file(req, res))

module.exports = router
