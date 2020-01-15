const fs = require('fs')

function readFile (path, name) {
	return new Promise(
		(resolve, reject) => fs.readFile(
			`${path || ''}${name}`,
			'utf8',
			(err, data) => (err ? reject(err) : resolve(data))
		)
	)
}

module.exports = readFile
