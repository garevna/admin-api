const fs = require('fs-extra')

class BaseController {
	/** Method for reading json from file */
	async readFileFromStorage (file) {
		return JSON.parse(await fs.readFile(`${__dirname}/../storage/map/${file}`))
	}
}

module.exports = BaseController
