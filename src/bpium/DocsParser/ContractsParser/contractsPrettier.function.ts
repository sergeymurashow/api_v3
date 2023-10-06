import _ from "lodash"
import { BigSheet } from "../DocumentsParser.class"
import transcribeContractNumber from "../../utils/transcribeContractNumber"

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc'
import customParseFormat from 'dayjs/plugin/customParseFormat'

dayjs.extend(utc)
dayjs.extend(customParseFormat)

export default function prettier(data: BigSheet[]): any[] {
	const result = {
		collection: {},
		set cell( input: {key: string, value: {[key: string]: any}} ){
			const { key, value } = input
			if ( !this.collection[key] ){
				this.collection[key] = {}
			}
			Object.assign(this.collection[key], value)
		},

		get rows() {
			return _.toArray( this.collection)
		}


	}
	data.forEach((m, i, a) => {
		let { row, col, value, merge, name } = m

		if ( +row <= 1 ) return

		switch (col) {
			case 'A': result.cell = {key: row, value: {
				number: transcribeContractNumber(value.split(/\sот/)[0]),
				fromDate: (() => {
					const parsedDate = value.match(/\d{2}\.\d{2}\.\d{4}/g)
					if (parsedDate) {
						return dayjs(parsedDate[0], 'DD.MM.YYYY').utc().format()
					}
					return null
				})(),
			}}
				break;
			case 'B': result.cell = { key: row, value: { contractType: value }}
				break;
			case 'E': result.cell = { key: row, value: { requisites: value }}
				break;
			case 'F': result.cell = { key: row, value: { client: value }}
				break;
			case 'G': result.cell = { key: row, value: { alias: value }}
				break;
		}

	})

	return result.rows
}