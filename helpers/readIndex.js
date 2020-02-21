const fs = require('fs-extra')

module.exports = async () => {
  try {
    const result = await fs.readFile('../public/index.html', 'utf8')
    return { status: 200, message: result }
  } catch (err) { return { status: 500, message: err.stack } }
}
