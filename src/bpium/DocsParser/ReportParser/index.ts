import _ from 'lodash'
import DocumentsParser from "../DocumentsParser.abstract"
import { Booking, Headers } from '../../types'
import FindTableTitle from '../FindTableTitle.class'
import GetBookingFromReport from './GetBookingFromReport.class'

export default interface ReportParser {
	table: Headers.Contract[]
	startIndex: number
}

type ParseResult = Booking & {Errors: Array<string>}

export default class ReportParser extends DocumentsParser {
	constructor(params) {
		super(params)
		const renamedTable = new FindTableTitle(this.bigSheet, 'contract').getTable()
		this.table = renamedTable.table
		this.startIndex = renamedTable.startIndex
	}
	get parsed(): ParseResult[] {
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
			.forEach((fo, fi, fa) => {
				let parsedBooking: ParseResult
				try {
					let getBooking = new GetBookingFromReport( fo )
					parsedBooking = getBooking.booking
					if( parsedBooking.Errors ) {

					}
					collect.push( parsedBooking )
				} catch ( e ) {
					console.error( e )
				}
				
			})
		return collect
	}
}

// let test = new ReportParser('/Users/sergey.murashow/Codets/intecoJiangjie/api_v3/testData/Report_short.xlsx').parsed
