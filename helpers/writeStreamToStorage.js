const fs = require('fs-extra')

module.exports = async (req, res, filePath) => {
  if (await fs.ensureFile(`./storage/${filePath}`)) {
    const dest = fs.createWriteStream(`./storage/${filePath}`)
    req.pipe(dest)
    req.on('error', (error) => {
      dest.end()
      res.status(500).send(error.stack)
    })
    req.on('end', () => {
      dest.end()
      res.status(200).send('ok')
    })
  }
  res.status(500).send(`Unable to create folder or file: ./storage/${filePath}`)
}
