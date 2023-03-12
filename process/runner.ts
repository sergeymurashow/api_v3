// Node modules
import Path from 'path'

// Interfaces
import { Any } from '../basicInterfaces'


type Systems = 'bpium' | '1c'

/**
 *  @param moduleName string The name of module is needed
 * 	@param Any A data for a work
 * 	@param boolean Type of launch
 */
export interface Params {
	moduleName: string
	data: Any
	async?: boolean
	callbackUrl?: string
}

/**
 * @classdesc Run API modules for different systems
 * @class
 */
export default abstract class Runner {
	workDir: string
	params: Params
	modulePath: () => string
	callbackPath: () => string
	constructor() {
		this.workDir = Path.resolve('src')
		this.params
		this.modulePath = (): string => { return Path.resolve(this.workDir, this.params.moduleName) }
		this.callbackPath = (): string => { return Path.resolve(this.workDir, 'callbacks', this.params.moduleName) }
	}
	async run(modulePath = this.modulePath) {
		console.log(modulePath())
		// let ModuleRun: Function
		try {
			let ModuleRun = await import(modulePath())
			return await ModuleRun.default(this.params.data)
		} catch (e) {
			console.error(e)
		}
	}
}
