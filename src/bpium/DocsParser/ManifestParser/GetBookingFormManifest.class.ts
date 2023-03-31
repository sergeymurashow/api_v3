import { Headers, Booking, ParseError } from "../../types"
import getContainerFromManifest from "./GetContainerFromManifest.class"
import * as manifestParsingFunctions from './manifestParsingFunctions/bookingParsing.function'
import { ErrorsCollector } from "../../../ErrorCollector"
import Parser from "../Parser.interface"

export default class GetBookingFormManifest implements Parser {
	inputRow: Headers.Manifest;
	Parsed: Booking
	Errors: ErrorsCollector
	constructor(inputRow: any) {
		this.inputRow = inputRow
		this.Parsed = {containers: []}
		this.Errors = new ErrorsCollector(`Manifest errors row: ${this.inputRow.row}`)
	}

	parse(): void {
		const Errors = this.Errors

		try {
			Object.assign(this.Parsed, { bookingId: manifestParsingFunctions.bookingId(this.inputRow.BLNO) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { pkgs: manifestParsingFunctions.pkgs(this.inputRow.PKGS) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { packType: manifestParsingFunctions.packType(this.inputRow.PACKAGETYPE) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { gWeight: manifestParsingFunctions.gWeight(this.inputRow.GWEIGHT) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { goods: manifestParsingFunctions.goods(this.inputRow.GOODS) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { shipper: manifestParsingFunctions.shipper(this.inputRow.SHIPPER) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { consignee: manifestParsingFunctions.consignee(this.inputRow.CONSIGNEE) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { notifyParty: manifestParsingFunctions.notifyParty(this.inputRow.NOTIFYPARTY) })
		} catch (e) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, { mark: manifestParsingFunctions.mark(this.inputRow.MARK) })
		} catch (e) {
			Errors.errLog(e)
		}
		// try {
		// 	Object.assign(this.Parsed, { remark: manifestParsingFunctions.remark(this.inputRow.REMARK) })
		// } catch (e) {
		// 	Errors.errLog(e)
		// }
		try {
			Object.assign(this.Parsed, { isManifest: true })
		} catch (e) {
			Errors.errLog(e)
		}
	}

	get info(): Booking & { Errors: string[]; } {
		this.parse()
		return Object.assign(this.Parsed, { Errors: this.Errors.getErrors() })
	}
}
