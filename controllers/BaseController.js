const fs = require('fs-extra')
const http = require('http2')

class BaseController {
	constructor () {
		this.http = http
	}

	/** Method for reading json from file */
	async _readJSONFromStorage (file) {
		return JSON.parse(await fs.readFile(`${__dirname}/../storage/${file}`))
	}

	async _readTextFromStorage (file) {
		/* eslint-disable-next-line */
    console.log(file)
		return await fs.readFile(`${__dirname}/../storage/${file}`)
	}
}

module.exports = BaseController
