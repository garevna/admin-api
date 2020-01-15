const fs = require('fs')
const Promise = require('promise')
const async = require('async')

const readFolder = require('./readFolder.js')

async function getFullContent (path, reject) {
	const content = []

	const folders = await readFolder(path, content, reject)

	for (const folder of folders) {
		const subfolders = await readFolder(
			`${path}/${Object.keys(folder)[0]}`,
			folder[Object.keys(folder)[0]],
			reject
		)
		for (const subfolder of subfolders) {
			await readFolder(
				`${path}/${Object.keys(folder)[0]}/${Object.keys(subfolder)[0]}/`,
				subfolder[Object.keys(subfolder)[0]],
				reject
			)
		}
	}

	return content
}

module.exports = getFullContent
