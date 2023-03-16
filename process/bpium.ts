// Node JS
import Path from 'path'

// Interfaces
import Runner, { Params } from "./Runner";

/**
 * @constructor
 * @typeDef 
 * {@link Runner}
 * @params
 * {@link Params}
 * @desc Run Bpium processes
 */
export class BpiumProcessRunner extends Runner {
	params: Params
	constructor(params: Params) {
		super()
		this.params = params
		this.workDir = Path.resolve(this.workDir, 'bpium')
	}
}

