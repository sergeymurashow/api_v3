import { ErrorsCollector } from "../../ErrorCollector";
import { Booking } from "../types";
import DocumentsParser from "./DocumentsParser.abstract";
import { Headers } from "../types";

/**
 * @argument Parsed type Booking
 * @argument Errors type ErrorsCollector
 * @method parse() void
 * @method booking getter
 */
export default interface Parser {
	inputRow: any
	Parsed: Booking
	Errors: ErrorsCollector
	parse(): void
	get booking(): Booking & {Errors: Array<string>}
}

// export default abstract class Parser {
// 	inputRow: any
// 	Parsed: Booking
// 	Errors: ErrorsCollector
// 	get booking(): Booking & {Errors: Array<string>}
// 	constructor( inputRow: any ) {
// 		this.inputRow = inputRow
// 		this.Parsed = {}
// 		this.Errors = new ErrorsCollector('Report errors')
// 	}
// 	privateparse(): void {}

// }