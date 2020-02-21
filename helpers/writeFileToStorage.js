const fs = require('fs-extra')

module.exports = async (filePath, text) => {
  try {
    await fs.outputFile(`./storage/${filePath}`, text)
    return { status: 200, message: 'ok' }
  } catch (err) { return { status: 500, message: err.stack } }
}
