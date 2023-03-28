import xls from 'xlsx'
import _ from 'lodash'

import { Obj } from '../types/index'
import utils from '../utils/index'

export default interface DocumentsParser {
	constructor(
		filePath: string,
	)
	fixVoyageNumber: string
	bigSheet: { row: string, value: string, name: string}[]
	testSheet?: Obj
	filePath?: string

}

// export declare namespace DocumentsParser {
// 	export interface FixVoyageNumber {
// 		(
// 			voyageNumber: string
// 		)
// 	}
// 	export type Matrix = { row: string, value: string, name: string}
// }


export default abstract class DocumentsParser {
	constructor(filePath: string) {
		let sheets = xls.readFile(filePath)
		let sheet = {}
		sheets.Workbook.Sheets.forEach(fo => {
			if (!fo.Hidden) sheet[fo.name] = sheets.Sheets[fo.name]
		})
		let parsedSheet = _.toArray(sheet).map(m => this.parseSheet(m))
		this.bigSheet = [].concat(...parsedSheet)
	}

	private parseSheet(sheet) {
		const table = []
		for (let i in sheet) {
			if (/\!/.test(i)) {
				continue
			}
			let [row, col, value] = [i.replace(/[a-zA-Z]+/, ''), i.replace(/\d+/, ''), sheet[i]['w']]
			table.push({ row, col, value })
		}
		return table
	}
}


