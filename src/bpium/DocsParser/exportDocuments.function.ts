import utils from '../utils'
import Path from 'path'

import ParseExcel from './ParseExcel.class'
import DocsFormat from './DocsFormat'
import { Booking } from '../types'
import UploadBooking from '../DocsUpload/UploadBooking.class'
import UploadContainer from '../DocsUpload/UploadContainer.class'

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

	let result: { [key: string | number]: any }[] = []
	for (let j in data) {
		let i = data[j]
		let parsed = new ParseExcel(i.fileName, i.docType).booking as Booking[]
		result = result.concat(parsed)

		let docsFormat = await new DocsFormat(parsed, i.docType).bpiumFormat()
		let prettiedBookings = await docsFormat.result()
		await Promise.all(prettiedBookings.map(async (m, index) => {
			let operationBooking, operationContainers
			try {
				operationBooking = await new UploadBooking()[m.method](m)
			} catch (e) {
				console.log(e)
			}
			if (m.containers && m.containers.length) {
				try {
					operationContainers = (async () => {
						Promise.all(m.containers.map(async (c) => {
							await new UploadContainer([operationBooking])[c.method](c)
						}))
					})()
				} catch (e) {
					console.log(e)
				}
			}
		}))

	}
	return result
}