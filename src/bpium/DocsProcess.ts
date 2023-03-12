import utils from './utils'
import { Obj } from './types'
import Path from 'path'

import ParseExcel from './DocsParser'

export default async function ModuleRun(data) {

	let dir = Path.resolve(__dirname, 'tmp')
	utils.createCatalogs(dir)
	data = data.map(m => {
		m.fileName = Path.resolve(dir, m.title)
		return m
	})

	for (let i of data) {
		await utils.downloadFiles(i)
	}

	let result: Obj[] = []
	for (let j in data) {
		let i = data[j]
		result = result.concat(new ParseExcel(i.fileName, i.docType).get())
	}
	return result
}
