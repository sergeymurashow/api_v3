import utils from '../utils'
import Path from 'path'

import ParseExcel from './ParseExcel.class'

export default async function exportDocuments(data) {

	let dir = Path.resolve(__dirname, 'tmp')
	utils.createCatalogs(dir)
	data = data.map(m => {
		m.fileName = Path.resolve(dir, m.title)
		return m
	})

	for (let i of data) {
		await utils.downloadFiles(i)
	}

	let result: {[key: string | number ]: any}[] = []
	for (let j in data) {
		let i = data[j]
		result = result.concat(new ParseExcel(i.fileName, i.docType).booking)
	}
	return result
}