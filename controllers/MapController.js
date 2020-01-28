const { ControllerFactory } = require('../lib')
const { readJSONFromStorage } = require('../helpers')

class MapController {
  async polygons (req, res) {
    return res.json(await readJSONFromStorage('map/polygons.json'))
  }

  async points (req, res) {
    return res.json(await readJSONFromStorage('map/points.json'))
  }
}

module.exports = new ControllerFactory(MapController)
