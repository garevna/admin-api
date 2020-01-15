const BaseController = require('./BaseController')

class MapController extends BaseController {
	async markers (req, res) {
		return res.json(await this.readFileFromStorage('markers.json'))
	}

	async polygons (req, res) {
		return res.json(await this.readFileFromStorage('polygons.json'))
	}

	async points (req, res) {
		return res.json(await this.readFileFromStorage('points.json'))
	}
}

module.exports = new MapController()
