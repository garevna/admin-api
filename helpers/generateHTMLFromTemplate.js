const fs = require('fs-extra')
const handlebars = require('handlebars')

module.exports = async (filePath, params) => {
  const source = await fs.readFile(filePath, 'utf-8')
  const template = handlebars.compile(source)
  return template(params)
}
