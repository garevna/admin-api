// const formidable = require('formidable')
// const fs = require('fs-extra')
//
// module.exports = async (req, module) => {
//   if (['blog', 'news', 'faq'].indexOf(module) === -1) return { status: 404, message: 'Module not defined' }
//
//   const result = {}
//
//
//   const streamPromise = (file) => new Promise((resolve, reject) => {
//     const source = fs.createReadStream(file)
//     const dest = fs.createWriteStream(`${folders[name]}/${file.name}`)
//
//     source.pipe(dest)
//
//     source.on('end', () => resolve({ status: 200, message: 'ok' }))
//     source.on('error', () => reject({ status: 500, message: error.stack }))
//   })
//   const propNames = {
//     pictureFile: 'picture',
//     avatarFile: 'author_ava',
//     logoFile: 'logo'
//   }
//   const promise = new Promise((resolve, reject) => {
//     const formData = new formidable.IncomingForm()
//     formData.on('field', async (name, value) => {
//       const prop = !propNames[name] ? name : propNames[name]
//       result[prop] = value
//     })
//     formData.on('file', async (name, file) => {
//       const response = await streamPromise(file)
//       if (response.status === 200) {
//         result[propNames[name]] = file.name
//       }
//       return result
//     })
//     formData.on('end', () => resolve(result))
//     formData.on('error', (err) => reject(err))
//     formData.parse(req)
//   })
//
//
//   try {
//     const response = await promise
//     return { status: 200, message: response }
//   } catch (err) { return { status: 400, message: err.stack } }
// }
