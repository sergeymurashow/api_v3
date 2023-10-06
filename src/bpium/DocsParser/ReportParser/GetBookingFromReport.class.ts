import { Booking, Contract, Matrix, ParseError, Container, Headers } from '../../types'
import { ErrorsCollector } from '../../../ErrorCollector'
import * as reportParsingFunctions from './reportParsingFunctions'
import containersParse from './getContainersFromReport.function'
import Parser from '../Parser.interface'

export default class GetBookingFromReport implements Parser {
	Parsed: Booking;
	Errors: ErrorsCollector
	inputRow: Headers.Report;
	constructor(inputRow: Headers.Report) {
		this.inputRow = inputRow
		this.Parsed = {}
		this.Errors = new ErrorsCollector(`Report errors in row: ${this.inputRow.row}`)
	}

	parse() {
		const Errors = this.Errors
		let containers

		try {
			containers = containersParse(this.inputRow)
		} catch (e) {
			console.error(e)
		}
		
		try {
			Object.assign(this.Parsed, { bookingId: reportParsingFunctions.bookingId(this.inputRow.BOOKINGNO) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { applicationDate: reportParsingFunctions.applicationDate(this.inputRow.DATE) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { contract: reportParsingFunctions.contract(this.inputRow.SC) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { voyageNumber: reportParsingFunctions.voyageNumber(this.inputRow.VESSEL) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { containersCount: reportParsingFunctions.containersCount(this.inputRow.NUMBEROFCONTAINER) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { mension: containers ? reportParsingFunctions.ejectFieldMap(containers, 'mension') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { type: containers ? reportParsingFunctions.ejectFieldMap(containers, 'type') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { gWeight: reportParsingFunctions.gWeight(this.inputRow.GROSSWEIGHT) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { shipper: reportParsingFunctions.shipper(this.inputRow.SHIPPER) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { to: 'VOSTOCHNY' })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { from: reportParsingFunctions.to(this.inputRow.POL) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { freight: containers ? reportParsingFunctions.ejectFieldMap(containers, 'freight') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { owner: containers ? reportParsingFunctions.ejectFieldMap(containers, 'owner') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { docType: 'contract' })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			if (!Errors.getErrors().length) Object.assign(this.Parsed, { containers: containersParse(this.inputRow) })
		} catch (e) {
			Errors.errLog(e)
		}
		console.log('Errors: ',Errors.getErrors())

	}

	get info() {
		this.parse()
		return Object.assign({}, this.Parsed, {Errors: this.Errors.getErrors()})
	}

}

