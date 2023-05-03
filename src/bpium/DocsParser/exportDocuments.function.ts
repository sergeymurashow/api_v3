import utils from '../utils'
import Path from 'path'

import ParseExcel from './ParseExcel.class'
import DocsFormat from '../DocsFormat'
import { Booking } from '../types'
import FormatManifest from '../DocsFormat/FormatManifest.class'

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
	let result2 = []
	for (let j in data) {
		let i = data[j]
		let parsed = new ParseExcel(i.fileName, i.docType).booking as Booking[]
		switch (i.docType) {
			case 'manifest': result2 = result2.concat( await new FormatManifest(parsed).result() )
			break;
			case 'contract':
			break;
		result = result.concat(parsed)
		}
	}
	return result2
}