import { Booking, Contract, Matrix, ParseError, Container, Headers } from '../../types'
import { ErrorsCollector } from '../../../ErrorCollector'
import * as parsingTools from './prettyData'
import containersParse from './getContainersFromReport.function'
import Parser from '../Parser.interface'

export default class GetBookingFromReport implements Parser {
	Parsed: Booking;
	Errors: ErrorsCollector
	inputRow: Headers.Contract;
	constructor(inputRow: Headers.Contract) {
		this.inputRow = inputRow
		this.Parsed = {}
		this.Errors = new ErrorsCollector('Report errors')
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
			Object.assign(this.Parsed, { bookingId: parsingTools.bookingId(this.inputRow.BOOKINGNO) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { applicationDate: parsingTools.applicationDate(this.inputRow.DATE) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { contract: parsingTools.contract(this.inputRow.SC) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { voyageNumber: parsingTools.voyageNumber(this.inputRow.VESSEL) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { containersCount: parsingTools.containersCount(this.inputRow.NUMBEROFCONTAINER) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { mension: containers ? parsingTools.ejectFieldMap(containers, 'mension') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { type: containers ? parsingTools.ejectFieldMap(containers, 'type') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { gWeight: parsingTools.gWeight(this.inputRow.GROSSWEIGHT) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { shipper: parsingTools.shipper(this.inputRow.SHIPPER) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { port: parsingTools.port(this.inputRow.POL) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { freight: containers ? parsingTools.ejectFieldMap(containers, 'freight') : null })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { owner: containers ? parsingTools.ejectFieldMap(containers, 'owner') : null })
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
		console.log(Errors.getErrors())

	}

	get booking() {
		this.parse()
		return Object.assign({}, this.Parsed, {Errors: this.Errors.getErrors()})
	}

}

