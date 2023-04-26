import xls from 'xlsx'
import _ from 'lodash'

import { Obj } from '../types/index'

export default interface DocumentsParser {
	constructor(
		filePath: string,
	)
	fixVoyageNumber: string
	bigSheet: { row: string, col: string, value: string, name: string, merge }[]
	testSheet?: Obj
	filePath?: string
	mergedRows

}

export default class DocumentsParser {
	constructor(filePath: string, pages: 'all' | 'first' = 'first') {
		let sheets
		let sheet = {}
		try {
			sheets = xls.readFile(filePath)
			sheets.Workbook.Sheets = sheets.Workbook.Sheets.filter(fi => !fi.Hidden)

		} catch (e) {
			console.error(e)
		}
		switch (pages) {
			case 'all': sheets.Workbook.Sheets.forEach((fo, index) => {
				sheet[fo.name] = sheets.Sheets[fo.name]
			})
			case 'first': sheet[sheets.Workbook.Sheets[0].name] = sheets.Sheets[sheets.Workbook.Sheets[0].name]
		}

		let parsedSheet = _.toArray(sheet).map(m => {
			return this.parseSheet(m)
		})
		this.bigSheet = [].concat(...parsedSheet)
	}

	private parseSheet(sheet) {
		const table = []
		let merged = sheet['!merges']
		for (let i in sheet) {
			if (/\!/.test(i)) {
				continue
			}
			let [row, col, value,] = [i.replace(/[a-zA-Z]+/, ''), i.replace(/\d+/, ''), sheet[i]['w']]
			let merge = this.getMergeRow(row, merged)
			
			table.push({ row, col, value, merge })
		}
		return table
	}

	private getMergeRow(row, merges) {
		if ( !merges ) return
		let foundMerges
		try {
			foundMerges = merges.find(f => {
				return f.s.r == row || f.e.r == row
			})
		} catch (e) {
			console.log(e)
		}
		if (typeof foundMerges !== 'undefined') {
			try {
				return { from: foundMerges.s.r + 1, to: foundMerges.e.r + 1}
			} catch (e) {
				console.log(e)
			}
		}
	}
}


