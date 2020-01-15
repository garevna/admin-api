const { readFolder } = require('../helpers')

async function getFullContent (path, reject) {
	const content = []

	const folders = await readFolder(path, content, reject)
	folders.forEach(async (folder) => {
		const subfolders = await readFolder(
			`${path}/${Object.keys(folder)[0]}`,
			folder[Object.keys(folder)[0]],
			reject
		)
		subfolders.forEach(async (subfolder) => {
			await readFolder(
				`${path}/${Object.keys(folder)[0]}/${Object.keys(subfolder)[0]}/`,
				subfolder[Object.keys(subfolder)[0]],
				reject
			)
		})
	})


	return content
}

module.exports = getFullContent
