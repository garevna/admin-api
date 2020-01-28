const fs = require('fs-extra')

module.exports = async (file) => JSON.parse(await fs.readFile(`${__dirname}/../storage/${file}`))
