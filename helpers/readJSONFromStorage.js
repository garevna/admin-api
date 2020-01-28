const fs = require('fs-extra')

module.exports = async (file) => {
  const path = `${__dirname}/../storage/${file}`
  if (await fs.exists(path)) {
    const data = await fs.readFile(path)
    return data
  }
  return null
}
