const fs = require('fs-extra')

module.exports = async (file, content) => {
  try {
    await fs.outputJSON(`./storage/${file}`, content)
    return { status: 200, message: 'ok' }
  } catch (err) { return { status: 500, message: err.stack } }
}
