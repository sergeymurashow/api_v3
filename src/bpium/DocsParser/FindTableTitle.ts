import { Obj } from "../types";
import samples, { DocType, Sample } from './samples'
import { Headers } from "../types";

import Path from 'path'
import DocumentParser from './DocumentsParser_old'
import _ from "lodash";


type DataCollector = {
	tableHeader?,
	headerTemplate?,
	renamedTable?,
	startIndex?,
	tableCollection?
}

export default interface FindTableTitle {
	docType: DocType
	tableArray: Obj[]
	dataCollector?: DataCollector
}

function clearCell(cell: string) {
	return cell.replace(/[^a-zA-Z\d]/g, '')
}

export default class FindTableTitle {

	constructor(tableArray: Obj[], docType: DocType) {
		this.tableArray = tableArray
		this.docType = docType
		this.dataCollector = {}
	}

	// Find row with table headers
	private findString() {
		const documentSample = samples.getWithAliases(this.docType)
		const raperCell = documentSample[0]

		const headersRow = this.tableArray.find(fi => {
			let { value } = fi
			value = clearCell(value.toString()).toUpperCase()
			return value === raperCell.alias
		})

		this.dataCollector.startIndex = +headersRow.row + 1

		const tableHeader = this.tableArray.filter(f => {
			return f.row === headersRow.row
		})

		Object.assign(this.dataCollector, { tableHeader })
		return this
	}

	private makeTemplate() {
		const sample: Sample[] = samples.getWithAliases(this.docType)

		const renamedObject: Obj = { row: 'row' }

		for (let i in this.dataCollector.tableHeader) {

			let oldCellName = this.dataCollector.tableHeader[i].value
			oldCellName = oldCellName.replace(/[^-a-zA-Z0-9 \\\/]/, '').toUpperCase()

			let foundSample = sample.find(fi => {
				return fi.cellName == oldCellName
			})

			if (foundSample) {
				foundSample.cellName = `${foundSample.cellName}_checked`
				renamedObject[this.dataCollector.tableHeader[i].col] = foundSample.alias
			}
		}

		this.dataCollector.headerTemplate = renamedObject
		return renamedObject

	}

	private renameColumns() {

		// function giver<T>(data: T): T {
		// 	return data
		// }

		// const headersPreset = (() => {
		// 	let tmp = {}
		// 	let headers = this.dataCollector.headerTemplate
		// 	for (let i in headers) {
		// 		Object.assign(tmp, { [headers[i]]: null })
		// 	}
		// 	return tmp
		// })()

		const collector = this.tableArray.map(m => {
			m.name = this.dataCollector.headerTemplate[m.col]
			return m
		})

		this.dataCollector.renamedTable = collector
		// switch (this.docType) {
		// case 'manifest': resp = giver<Headers.Manifest[]>(collector)
		// 		break;
		// 	case 'contract': resp = giver<Headers.Contract[]>(collector)
		// 		break;
		// }
		return collector
	}

	private makeTableCollection() {
		const keys = Object.keys(this.dataCollector.headerTemplate)
		const tableCollection = []
		let tmp = {}
		let rowNumber
		this.dataCollector.renamedTable
			.filter(fi => +fi.row >= this.dataCollector.startIndex)
			.forEach(fo => {
				if (!tmp[fo.row]) Object.assign(tmp, { [fo.row]: { row: fo.row } })

				let field = {
					[fo.name]: fo.value
				}

				Object.assign(tmp[fo.row], field)

			})
		this.dataCollector.tableCollection = _.toArray(tmp)

	}

	getTable() {
		this.findString()
		this.makeTemplate()
		this.renameColumns()
		this.makeTableCollection()
		return { table: this.dataCollector.tableCollection, startIndex: this.dataCollector.startIndex }
	}
}

// let file = Path.resolve('src', 'DocsParse', 'testData', 'MANIFEST-01.xls')

// let parser = new DocumentParser(file)
// let sheet = parser.bigSheet

// let test = new FindTableTitle(sheet, 'manifest').getTable()

