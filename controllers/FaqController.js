const { ControllerFactory } = require('../lib')

const {
  readFileFromStorage,
  writeFileToStorage,
  removeFileFromStorage,
  readJSONFromStorage,
  writeJSONToStorage
} = require('../helpers')

class FaqController {
  async getContent (req, res) {
    return res.json(await readJSONFromStorage('faq/content.json'))
  }

  async postContent (req, res) {
    return res.json(await writeJSONToStorage('faq/content.json', req.body))
  }

  async getFile (req, res) {
    return res.send(await readFileFromStorage(`faq/content/${req.params.file}`))
  }

  async postFile (req, res) {
    return res.send(await writeFileToStorage(`faq/content/${req.params.file}`, req.body))
  }

  async removeFile (req, res) {
    return res.send(await removeFileFromStorage(`faq/content/${req.params.file}`))
  }
}

module.exports = new ControllerFactory(FaqController)
