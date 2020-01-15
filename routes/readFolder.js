const fs = require( "fs" )
const Promise = require("promise")
const async = require("async")

function promiseFolderContent ( path ) {
  return new Promise(
    (resolve, reject) => 
      fs.readdir (`${path}/`, function(err, items) {
        if (err) {
          // console.log (err)
          reject ({ error: `Error reading folder ${path}` })
        } else resolve (items)
      })
    )
}

async function readFolder(path, target, reject) {
  
  let content = await promiseFolderContent (path)
    .catch (err => reject (err))

  if (!content) return null
  
  target.push (
    ...content.filter (
      item => fs.statSync(`${path}/${item}`).isFile()
    )
  )
    
  let subfolders = content
    .filter(item => fs.statSync(`${path}/${item}`).isDirectory())
      .map(folder => ({ [folder]:[] }))
  
  subfolders && target.push (...subfolders)
    
  return subfolders || []
}

module.exports = readFolder