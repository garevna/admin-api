const fs = require('fs-extra')

module.exports = async (file) => {
  try {
    const result = await fs.readFile(`./storage/${file}`, 'utf8')
    return { status: 200, message: result }
  } catch (err) { return { status: 500, message: err.stack } }
}
