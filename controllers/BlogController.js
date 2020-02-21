const { ControllerFactory } = require('../lib')

const { uploadPicture, uploadAvatar } = require('../middleware')

/* eslint-disable camelcase */
/* eslint-disable no-return-await */

/* eslint-disable no-console */

const {

  readFileFromStorage,
  writeFileToStorage,
  removeFileFromStorage,
  readJSONFromStorage,
  writeJSONToStorage,
  readFolderOfStorage,
  clearAllFields,
  readStreamFromStorage,
  writeStreamToStorage

} = require('../helpers')

class BlogController {
  updateLogo (host, logo) {
    return `https://${host}/images/${logo || 'default.jpg'}`
  }

  updateAvatar (host, logo_user) {
    return `https://${host}/avatars/${logo_user || 'default.png'}`
  }

  updateImages (host, article) {
    article.logo = this.updateLogo(host, article.logo)
    article.logo_user = this.updateAvatar(host, article.logo_user)
    return article
  }

  updateContent (host, content) {
    content.data.forEach((item) => {
      item.logo = this.updateLogo(host, item.logo)
      item.logo_user = this.updateAvatar(host, item.logo_user)
    })
    return content
  }

  clearURL (imageURL) {
    return imageURL ? imageURL.split('/').pop() : ''
  }

  clearImagesURL (article) {
    article.logo = this.clearURL(article.logo)
    article.logo_user = this.clearURL(article.logo_user)
    return article
  }

  clearContent (content) {
    content.data.forEach((article, index) => { content.data[index] = this.clearImagesURL(article) })
    return content
  }

  async saveArticleText (article) {
    article.file = article.file ? article.file : `${Date.now()}.html`
    if (article.text) {
      const { status, message } = await writeFileToStorage(`blog/content/${article.file}`, article.text)
      if (status !== 200) console.log(message)
      delete article.text
    }
    return article
  }

  async getBlogContent (req, res) {
    const { status, message } = await readJSONFromStorage('blog/content.json')
    if (status !== 200) return res.status(status).send(message)

    return res.json(this.updateContent(req.headers.host, JSON.parse(message)))
  }

  async postBlogContent (req, res) {
    const content = this.clearContent(JSON.parse(req.body))
    content.data.forEach(async (article) => await this.saveArticleText(article))

    const result = await writeJSONToStorage('blog/content.json', content)
    return res.status(result.status).send(result.message)
  }

  async uploadArticleLogo (req, res) {
    try {
      await uploadPicture(req, res)
      return res.status(200).send(this.updateLogo(req.headers.host, req.file.filename))
    } catch (error) { return { status: 400, message: error.stack } }
  }

  async uploadArticleAvatar (req, res) {
    try {
      await uploadAvatar(req, res)
      return res.status(200).send(this.updateAvatar(req.headers.host, req.file.filename))
    } catch (error) { return { status: 400, message: error.stack } }
  }

  async getArticleById (req, res) {
    const { status, message } = await readJSONFromStorage('blog/content.json')
    if (status !== 200) return res.status(status).send(message)
    let article = JSON.parse(message).data.find((item) => item.id === Number(req.params.id))
    article = this.updateImages(req.headers.host, article)
    const text = article.file ? await readFileFromStorage(`blog/content/${article.file}`) : ''
    article.text = text.status === 200 ? text.message : ''
    return res.json(article)
  }

  async createNewArticle (req, res) {
    const result = await readJSONFromStorage('blog/content.json')
    if (result.status !== 200) return res.status(result.status).send(result.message)
    const content = JSON.parse(result.message)
    const article = clearAllFields(content.data[0])
    article.id = Math.max(...content.data.map((item) => item.id)) + 1
    article.title = 'New Article...'
    article.file = `${Date.now()}.html`
    await writeFileToStorage(`blog/content/${article.file}`, '...')
    content.data.push(article)
    const { status, message } = await writeJSONToStorage('blog/content.json', content)
    if (status !== 200) return res.status(status).send(message)
    return res.json({ id: article.id, content: this.updateContent(req.headers.host, content) })
  }

  async deleteArticleById (req, res) {
    const result = await readJSONFromStorage('blog/content.json')
    if (result.status !== 200) return res.status(result.status).send(result.message)
    const content = JSON.parse(result.message)
    const index = content.data.findIndex((item) => item.id === Number(req.params.id))
    if (index === -1) return res.status(404).send('Not found')
    const del = await removeFileFromStorage(content.data[index].file)
    if (del.status === 200) console.log('Has been removed: ', content.data[index].file)
    content.data.splice(index, 1)
    const { status, message } = await writeJSONToStorage('blog/content.json', content)
    if (status !== 200) return res.status(status).send(message)
    return res.json(this.updateContent(req.headers.host, content))
  }

  async postArticleById (req, res) {
    if (!req.body) res.status(409).send('No body')
    const article = this.clearImagesURL(await this.saveArticleText(req.body))

    const result = await readJSONFromStorage('blog/content.json')
    if (result.status !== 200) res.status(result.status).send(result.message)
    const content = JSON.parse(result.message)

    const index = content.data.findIndex((item) => item.id === Number(req.params.id))
    if (index === -1) return res.status(404).send('Not found')
    content.data[index] = article

    const { status, message } = await writeJSONToStorage('blog/content.json', content)
    return res.status(status).send(message)
  }

  async removeImage (req, res) {
    const folder = req.path.match(/images/) ? 'images' : 'avatars'
    const result = await removeFileFromStorage(`blog/${folder}/${req.params.file}`)
    return res.status(result.status).send(result.message)
  }

  async getAllImages (req, res) {
    console.log(req.path)
    const folder = req.path.match(/images/) ? 'images' : 'avatars'
    const result = await readFolderOfStorage(`blog/${folder}`)
    return res.status(result.status).send(result.message)
  }

  async getLargeFile (req, res) {
    console.log('GET LARGE FILE:\n', req.path, req.params.file)
    await readStreamFromStorage(res, `blog/large/${req.params.file}`)
  }

  async postLargeFile (req, res) {
    console.log('POST LARGE FILE:\n', req.path, req.params.file)
    await writeStreamToStorage(req, res, `blog/large/${req.params.file}`)
  }
}

module.exports = new ControllerFactory(BlogController)
