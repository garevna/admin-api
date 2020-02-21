const multer = require('multer')

const storage = multer.diskStorage({

  destination: (req, file, callback) => {
    const folders = {
      picture: 'blog/images',
      avatar: 'blog/avatars',
      logo: 'news/logos'
    }
    callback(null, `./storage/${folders[file.fieldname] || 'uploads'}`)
  },

  filename: (req, file, callback) => {
    const fileName = `${Date.now()}.${file.originalname.split('.').slice(-1)[0]}`
    callback(null, fileName)
  }
})

const upload = multer({ storage })
module.exports = upload
