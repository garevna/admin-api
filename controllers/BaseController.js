const fs = require('fs-extra')
const http = require('http2')

class BaseController {
	constructor () {
		this.http = http
	}

	/** Method for reading json from file */
	async _readFileFromStorage (file) {
		return JSON.parse(await fs.readFile(`${__dirname}/../storage/${file}`))
	}
}

module.exports = BaseController
