const fs = require('fs-extra')

module.exports = async (res, filePath) => {
  if (await fs.ensureFile(`./storage/${filePath}`)) {
    const stream = await fs.createReadStream(`./storage/${filePath}`)
    stream.pipe(res)
    stream.on('end', () => res.status(200).send('ok'))
    stream.on('error', (err) => res.status(500).send(err.stack))
  }
  return { status: 500, message: `File ./storage/${filePath} does not exist` }
}
