const router = require('express').Router()

/** Controllers */
const { MapController } = require('../controllers')

/** Routes */
router.get('/markers', (req, res) => MapController.markers(req, res))
router.get('/polygons', (req, res) => MapController.polygons(req, res))
router.get('/points', (req, res) => MapController.points(req, res))

module.exports = router
