import { ErrorsCollector } from "../../ErrorCollector";
import { Booking, Container } from "../types";

/**
 * @argument Parsed type Booking
 * @argument Errors type ErrorsCollector
 * @method parse() void
 * @method booking getter
 */
export default interface Parser {
	inputRow: any
	Parsed: Booking | Container
	Errors: ErrorsCollector
	parse(): void
	get info(): Booking | Container & {Errors: Array<string>}
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
// 	private parse(): void {}

// }