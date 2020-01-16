const fs = require('fs-extra')

class BaseController {
	/** Method for reading json from file */
	async _readFileFromStorage (file) {
		return JSON.parse(await fs.readFile(`${__dirname}/../storage/${file}`))
	}
}

module.exports = BaseController
