const router = require('express').Router()

/** Controllers */
const { BlogController, MapController, EmailController } = require('../controllers')
/** Request Validator */
const { EmailRequest } = require('../requests')

/** Blog */
router.get('/blog/news', BlogController.news)
router.get('/blog/content', BlogController.content)
router.get('/blog/content/:file', BlogController.file)

/** Map */
router.get('/map/polygons', MapController.polygons)
router.get('/map/points', MapController.points)

/** Email */
router.post('/mail', EmailRequest.create, EmailController.create)

module.exports = router
