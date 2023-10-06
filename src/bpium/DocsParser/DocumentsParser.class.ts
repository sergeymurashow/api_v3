import xls from 'xlsx'
import _ from 'lodash'

import { Obj } from '../types/index'
export type BigSheet = { row: string, col: string, value: string, name: string, merge }

export default interface DocumentsParser {
	constructor(
		filePath: string,
	)
	fixVoyageNumber: string
	bigSheet: BigSheet[]
	colIndexes: string[]
	testSheet?: Obj
	filePath?: string
	mergedRows
}

type Merges = {
	s: {
		c: number | string,
		r: number | string,
	},
	e: {
		c: number | string,
		r: number | string,
	},
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
			case 'all': sheets.Workbook.Sheets.forEach((fo) => {
				sheet[fo.name] = sheets.Sheets[fo.name]
			})
			default: sheet[sheets.Workbook.Sheets[0].name] = sheets.Sheets[sheets.Workbook.Sheets[0].name]
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

			table.push({ row, col, value })
		}

		this.colIndexes = this.makeColIndexes(table)
		if (merged) {
			merged.forEach(merge => {
				merge.s.c = this.colIndexes[merge.s.c]
				merge.e.c = this.colIndexes[merge.e.c]
			})
			table.forEach((fo, fi, fa) => {
				let merge = this.getMergeRow(fo.row, fo.col, merged)
				fo.merge = merge
			})
		}
		return table
		/* 
		Need to remap merges
		*/
	}

	private makeColIndexes(table: BigSheet[]) {
		let colIndexes = table.map(m => m.col)
		colIndexes = _.uniq(colIndexes)
		return colIndexes.sort((a, b) => {
			if (a.length > b.length) return 1
			if (a.length < b.length) return -1
			return 0
		})
	}

	private getMergeRow(row, col, merges: Merges[]) {
		if (!merges) return
		let foundMerges
		try {
			foundMerges = merges.find(f => {
				let mergeStart = f.s.c === col && f.s.r === +row - 1
				let mergeEnd = f.e.c === col && f.e.r === +row - 1
				return mergeStart || mergeEnd
			})
		} catch (e) {
			console.log(e)
		}
		if (typeof foundMerges !== 'undefined') {
			try {
				return { from: foundMerges.s.r + 1, to: foundMerges.e.r + 1 }
			} catch (e) {
				console.log(e)
			}
		}
	}
}


