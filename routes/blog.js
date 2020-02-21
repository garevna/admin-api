const router = require('express').Router()
const bodyParser = require('body-parser')

router.use(bodyParser.json())

/** Controllers */
const { BlogController } = require('../controllers')

/** Routes */
router.get('/content', (req, res) => BlogController.getBlogContent(req, res))
router.post('/content', (req, res) => BlogController.postBlogContent(req, res))

router.post('/article/new', (req, res) => BlogController.createNewArticle(req, res))
router.get('/article/:id', (req, res) => BlogController.getArticleById(req, res))
router.post('/article/:id', (req, res) => BlogController.postArticleById(req, res))
router.delete('/article/:id', (req, res) => BlogController.deleteArticleById(req, res))

router.post('/avatar', (req, res) => BlogController.uploadArticleAvatar(req, res))
router.post('/picture', (req, res) => BlogController.uploadArticleLogo(req, res))

router.get('/images', (req, res) => BlogController.getAllImages(req, res))
router.get('/avatars', (req, res) => BlogController.getAllImages(req, res))

// router.delete('/content/:file', (req, res) => BlogController.removeFile(req, res))
router.delete('/images/:file', (req, res) => BlogController.removeImage(req, res))
router.delete('/avatars/:file', (req, res) => BlogController.removeImage(req, res))

module.exports = router
