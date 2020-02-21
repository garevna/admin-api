const util = require('util')
const upload = require('./upload')

module.exports = util.promisify(upload.single('picture'))
