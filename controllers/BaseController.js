const fs = require('fs-extra')
const http2 = require('http2')

class BaseController {
  constructor () {
    this.http2 = http2
  }

  async _readJSONFromStorage (file) {
    return JSON.parse(await fs.readFile(`${__dirname}/../storage/${file}`))
  }

  async _readTextFromStorage (file) {
    const path = `${__dirname}/../storage/${file}`
    if (await fs.exists(path)) {
      const data = await fs.readFile(path)
      return data
    }
    return null
  }
}

module.exports = BaseController
