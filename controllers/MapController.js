const BaseController = require('./BaseController')

class MapController extends BaseController {
	async polygons (req, res) {
		return res.json(await this._readFileFromStorage('polygons.json'))
	}

	async points (req, res) {
		return res.json(await this._readFileFromStorage('points.json'))
	}
}

module.exports = new MapController()
