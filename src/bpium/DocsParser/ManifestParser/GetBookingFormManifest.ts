import { Headers, Booking, ParseError } from "../../types"
import getContainerFromManifest from "./getContainersFromManifest"
import * as parsingTools from '../ReportParser/prettyData'
import { ErrorsCollector } from "../../../ErrorCollector"
import Parser from "../Parser.interface"

export default class GetBookingFormManifest implements Parser {
	inputRow: any;
	Parsed: Booking = {containers: []}
	Errors: ErrorsCollector = new ErrorsCollector('Manifest Errors')
	constructor(inputRow: any) {
		this.inputRow = inputRow
	}

	parse(): void {
		const Errors = this.Errors

		this.inputRow.MENSION = this.inputRow.MENSION.toString().replace(/[^\d]/g, '')
		try {
			Object.assign(this.Parsed, { bookingId: parsingTools.bookingId(this.inputRow.BLNO) })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { pkgs: this.inputRow.PKGS })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { packType: this.inputRow.PACKAGETYPE })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { gWeight: this.inputRow.GWEIGHT })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { desc: this.inputRow.GOODS })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { shipper: this.inputRow.SHIPPER })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { consignee: this.inputRow.CONSIGNEE })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { notifyParty: this.inputRow.NOTIFYPARTY })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { mark: this.inputRow.MARK })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { remark: this.inputRow.REMARK })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { owner: this.inputRow.CONTAINEROWNER })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { type: this.inputRow.TYPE })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { mension: this.inputRow.MENSION })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { freight: this.inputRow.FREIGHT })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, { isManifest: true })
		} catch (e) {
			Errors.errLog(e.message)
		}
		try {
			Object.assign(this.Parsed, {
				containers: [
					getContainerFromManifest(this.inputRow)
				]
			})
		} catch (e) {
			Errors.errLog(e.message)
		}
	}

	get booking(): Booking & { Errors: string[]; } {
		this.parse()
		return Object.assign(this.Parsed, { Errors: this.Errors.getErrors() })
	}
}
