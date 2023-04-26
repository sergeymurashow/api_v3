import { ErrorsCollector } from "../../../ErrorCollector";
import { Headers, Container, Booking } from "../../types"
import Parser from "../Parser.interface"
import * as containerParsingFunctions from './manifestParsingFunctions/containerParsing.function'

export default class GetContainerFromManifest implements Parser {
	inputRow: Headers.ManifestContainer
	Parsed: Container;
	Errors: ErrorsCollector
	constructor( inputRow: Headers.ManifestContainer ) {
		this.inputRow = inputRow
		this.Parsed = {} as any
		this.Errors = new ErrorsCollector(`Container errors in row: ${this.inputRow.row}`)
	}

	parse() {
		const Errors = this.Errors

		try {
			Object.assign(this.Parsed, {vol: containerParsingFunctions.vol(this.inputRow.VOLUME)})
		} catch ( e ) {
			Errors.errLog(e)
		}
		try {
			Object.assign(this.Parsed, {number: containerParsingFunctions.number(this.inputRow.CONTAINERNO)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {freight: containerParsingFunctions.freight(this.inputRow.FREIGHT)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {gWeight: containerParsingFunctions.gWeight(this.inputRow.GWEIGHT_2)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {mension: containerParsingFunctions.mension(this.inputRow.MENSION)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {owner: containerParsingFunctions.owner(this.inputRow.CONTAINEROWNER)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {packages: containerParsingFunctions.packages(this.inputRow.PKGS_2)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {seal: containerParsingFunctions.seal(this.inputRow.SEAL)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {tWeight: containerParsingFunctions.tWeight(this.inputRow.CONTAINERTAREWEIGHT)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {type: containerParsingFunctions.type(this.inputRow.TYPE)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, {cbm: containerParsingFunctions.cbm(this.inputRow.CBM)})
		} catch ( e ) {
			Errors.errLog( e )
		}
		try {
			Object.assign(this.Parsed, { remark: containerParsingFunctions.remark(this.inputRow.REMARK) })
		} catch (e) {
			Errors.errLog(e)
		}
	}
	get info() {
		this.parse()
		return Object.assign({}, this.Parsed, {Errors: this.Errors.getErrors()})
	}
}


// export default function getContainerFromManifest(data: Headers.ManifestContainer): Container {
// 	try {
// 		data.CONTAINERNO = data.CONTAINERNO.toString().replace(/[^\d\w]/g, '')
// 	} catch (e) {
// 		console.log(typeof data.CONTAINERNO)
// 	}
// 	let resp
// 	try {
// 		resp = {
// 			vol: data.VOLUME,
// 			number: data.CONTAINERNO,
// 			seal: data.SEAL,
// 			packages: data.PKGS_2,
// 			gWeight: data.GWEIGHT_2,
// 			tWeight: data.CONTAINERTAREWEIGHT,
// 			cbm: data.CBM,
// 			freight: data.FREIGHT,
// 			owner: data.CONTAINEROWNER ? data.CONTAINEROWNER.toString().replace(/\t+/g, '') : data.CONTAINEROWNER,
// 			type: data.TYPE.toString().replace(/[^a-zA-Z]/g, ''),
// 			mension: data.MENSION.toString().replace(/[^\d]/g, '')
// 		}
// 	} catch (e) {
// 		console.log(e)
// 	}
// 	return resp
// }