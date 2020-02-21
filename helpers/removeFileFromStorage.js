const fs = require('fs-extra')

module.exports = async (filePath) => {
  try {
    await fs.remove(`./storage/${filePath}`)
    return { status: 200, message: 'ok' }
  } catch (err) { return { status: 500, message: err.stack } }
}
