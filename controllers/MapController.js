const BaseController = require('./BaseController')

class MapController extends BaseController {
  async polygons (req, res) {
    return res.json(await this._readJSONFromStorage('map/polygons.json'))
  }

  async points (req, res) {
    return res.json(await this._readJSONFromStorage('map/points.json'))
  }
}

module.exports = new MapController()
