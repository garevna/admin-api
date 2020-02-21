const fs = require('fs-extra')

module.exports = async (folderPath) => {
  try {
    const files = await fs.readdir(`./storage/${folderPath}`)
    return { status: 200, message: JSON.stringify(files) }
  } catch (err) { return { status: 500, message: err.stack } }
}
