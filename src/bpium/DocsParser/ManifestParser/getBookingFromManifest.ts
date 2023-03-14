import { result } from "lodash"
import { Headers, Booking, ParseError } from "src/bpium/types"
import getContainerFromManifest from "./getContainersFromManifest"
import * as parsingTools from '../ReportParser/prettyData'
import { ErrorsCollector } from "../../../../src/ErrorCollector"

export default function getBookingFromManifest(data: Headers.Manifest, voyageNumber: string): Booking | ParseError {
	const Errors = new ErrorsCollector('Manifest errors')

	data.MENSION = data.MENSION.toString().replace(/[^\d]/g, '')
	let result: Booking = {}
	try {
		Object.assign(result, { bookingId: parsingTools.bookingId(data.BLNO) })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { voyageNumber: voyageNumber })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { pkgs: data.PKGS })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { packType: data.PACKAGETYPE })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { gWeight: data.GWEIGHT })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { desc: data.GOODS })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { shipper: data.SHIPPER })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { consignee: data.CONSIGNEE })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { notifyParty: data.NOTIFYPARTY })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { mark: data.MARK })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { remark: data.REMARK })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { owner: data.CONTAINEROWNER })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { type: data.TYPE })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { mension: data.MENSION })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { freight: data.FREIGHT })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, { isManifest: true })
	} catch (e) {
		Errors.errLog(e.message)
	}
	try {
		Object.assign(result, {
			containers: [
				getContainerFromManifest(data)
			]
		})
	} catch (e) {
		Errors.errLog(e.message)
	}

	if( Errors.getErrors().length ) {
		// return Errors.getErrors()
	} 
	return result

	// hs: data.K ? data.K.replace(/\t+/g, '') : data.K,

}