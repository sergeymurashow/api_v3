import _ from 'lodash'
import DocumentsParser from "../DocumentsParser"
import { Booking, matrix, ParseError, Container, Headers } from '../../types'
import FindTableTitle from '../FindTableTitle'
import getBookingFromReport from './getBookingFromReport'
import { ErrorsCollector } from '../../../../src/ErrorCollector'

export default interface ReportParser {
	table: Headers.Contract[]
	startIndex: number
}

type ParseResult = {
	data: Booking,
	errors: string[]
}

export default class ReportParser extends DocumentsParser {
	constructor(params) {
		super(params)
		const renamedTable = new FindTableTitle(this.bigSheet, 'contract').getTable()
		this.table = renamedTable.table
		this.startIndex = renamedTable.startIndex
	}
	get parsed(): ParseResult[] {
		const Errors = new ErrorsCollector('This report errors')
		const collect: ParseResult[] = []
		this.table
			.filter(f => {
				try {
					return f.BOOKINGNO && f.BOOKINGNO.toString().match(/(INT|INJIAN)\d+/) as Headers.Contract
				} catch (e) {
					console.error(e)
					console.log(f)
				}
			})
			.forEach(fo => {
				let parsedBooking: ParseResult
				try {
					parsedBooking = getBookingFromReport(fo) as ParseResult
					if( parsedBooking.errors ) {

					}
					collect.push( parsedBooking )
				} catch ( e ) {
					console.error( e )
				}
				
			})
		return collect
	}
}

// let test = new ReportParser('/Users/sergey.murashow/Codets/intecoJiangjie/api_v3/testData/fuckingTestReport.xlsx').parsed
