const fs = require("fs")
const Promise = require("promise")
const async = require("async")

function readFile (path, name) {
  return new Promise(
    (resolve, reject) => 
      fs.readFile(
        `${ path ? path : "" }${name}`, 
        "utf8", 
        (err, data) => err ? reject(err) : resolve(data)
      )
  )
}

module.exports = readFile