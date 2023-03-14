import { Booking, Matrix, ParseError, Container, Headers } from '../../types'
import { ErrorsCollector } from '../../../../src/ErrorCollector'
import * as parsingTools from './prettyData'
import containersParse from './getContainersFromReport'

export default function getBookingFromReport(data: Headers.Contract): { data: Booking, errors: string[] } {
	const Errors = new ErrorsCollector(`Report errors row ${data.row}`)

	let containers
	try {
		containers = containersParse( data )
	} catch (e) {
		console.error(e)
	}

	let result: Booking = {}
	try {
		Object.assign(result, { bookingId: parsingTools.bookingId(data.BOOKINGNO) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { applicationDate: parsingTools.applicationDate(data.DATE) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { contract: parsingTools.contract(data.SC) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { voyageNumber: parsingTools.voyageNumber(data.VESSEL) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { containersCount: parsingTools.containersCount(data.NUMBEROFCONTAINER) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { mension: containers ? parsingTools.ejectFieldMap( containers, 'mension' ) : null })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { type: containers ? parsingTools.ejectFieldMap( containers, 'type' ) : null })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { gWeight: parsingTools.gWeight(data.GROSSWEIGHT) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { shipper: parsingTools.shipper(data.SHIPPER) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { port: parsingTools.port(data.POL) })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { freight: containers ? parsingTools.ejectFieldMap( containers, 'freight' ) : null })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { owner: containers ? parsingTools.ejectFieldMap( containers, 'owner' ) : null })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		Object.assign(result, { docType: 'contract' })
	} catch (e) {
		Errors.errLog(e)
	}
	try {
		if (!Errors.getErrors().length) Object.assign(result, { containers: containersParse(data) })
	} catch (e) {
		Errors.errLog(e)
	}
	console.log(Errors.getErrors())
	
	return { data: result, errors: Errors.getErrors() }
}
