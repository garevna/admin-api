const fs = require('fs')

module.exports = async (path, name) => fs.readFile(`${path || ''}${name}`, 'utf8')
