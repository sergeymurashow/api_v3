import _ from 'lodash'
import DocumentsParser from "../DocumentsParser.class"
import { Booking, Headers, Container } from '../../types'
import FindTableTitle from '../FindTableTitle.class'
import GetBookingFromReport from './GetBookingFromReport.class'

export default interface ReportParser {
	table: Headers.Report[]
	startIndex: number
}

type ParseResult = Booking & {Errors: Array<string>}

export default class ReportParser extends DocumentsParser {
	constructor(params) {
		super(params)
		const renamedTable = new FindTableTitle(this.bigSheet, 'report').getTable()
		this.table = renamedTable.table
		this.startIndex = renamedTable.startIndex
	}
	get parsed(): ParseResult[] {
		const collect: ParseResult[] = []

		const getGroupedData = (containers: Container[]) => {

			const toEject = [ 'mension', 'type', 'owner', 'freight', 'dropPort']
			const result: Omit<Container, 'number'> = {}

			for ( let key of toEject ) {
				try {
				if ( toEject.includes(key) ) {
					result[key] = _.uniq(containers.map ( container => container[key]))
				}} catch (e) {
					result[key] = [ null ]
				}
			}

			const { mension, type, owner, freight, dropPort } = result
			return {
				mension,
				type,
				owner,
				freight,
				dropPort,
			}
			
		}

		this.table
			.filter(f => {
				try {
					return f.BOOKINGNO && f.BOOKINGNO.toString().match(/(INT|INJIAN)\d+/) as Headers.Report
				} catch (e) {
					console.error(e)
					console.log(f)
				}
			})
			.forEach((fo, fi, fa) => {
				let parsedBooking: ParseResult
				try {
					let getBooking = new GetBookingFromReport( fo )
					parsedBooking = getBooking.info
					Object.assign( parsedBooking, getGroupedData( parsedBooking.containers ) )
					collect.push( parsedBooking )
				} catch ( e ) {
					console.error( e )
				}
				
			})
		return collect
	}
}
