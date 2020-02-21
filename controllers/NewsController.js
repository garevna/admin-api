const { ControllerFactory } = require('../lib')

const { uploadLogo } = require('../middleware')

const {
  readJSONFromStorage,
  writeJSONToStorage,
  readFolderOfStorage,
  removeFileFromStorage
} = require('../helpers')

class NewsController {
  updateLogo (host, logo) {
    return `https://${host}/logos/${logo || 'default.jpg'}`
  }

  async getNews (req, res) {
    const { status, message } = await readJSONFromStorage('news/content.json')
    return res.status(status).send(message)
  }

  async getArticleById (req, res) {
    const { status, message } = await readJSONFromStorage('news/content.json')
    if (status !== 200) return res.status(status).send(message)
    const article = JSON.parse(message).data.find((item) => item.id === req.params.id)
    if (article) return res.json(article)
    return res.status(404).send('Not found')
  }

  async postNews (req, res) {
    const { status, message } = await writeJSONToStorage('news/news.json', req.body)
    if (status === 200) return res.json(message)
    return res.status(status).send(message)
  }

  async uploadLogo (req, res) {
    try {
      await uploadLogo(req, res)
      return res.status(200).send(this.updateLogo(req.headers.host, req.file.filename))
    } catch (error) { return { status: 400, message: error.stack } }
  }

  async removeLogo (req, res) {
    const { status, message } = await removeFileFromStorage(`news/logos/${req.params.file}`)
    return res.status(status).send(message)
  }

  async getAllLogos (req, res) {
    try {
      const files = await readFolderOfStorage('news/logos')
      return res.status(200).send(JSON.stringify(files))
    } catch (error) {
      return res.status(500).send(error.stack)
    }
  }
}

module.exports = new ControllerFactory(NewsController)
