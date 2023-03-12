import { Any } from '../basicInterfaces';
/**
 *  @param moduleName string The name of module is needed
 * 	@param Any A data for a work
 * 	@param boolean Type of launch
 */
export interface Params {
    moduleName: string;
    data: Any;
    async?: boolean;
    callbackUrl?: string;
}
/**
 * @classdesc Run API modules for different systems
 * @class
 */
export default abstract class Runner {
    workDir: string;
    params: Params;
    modulePath: () => string;
    callbackPath: () => string;
    constructor();
    run(modulePath?: () => string): Promise<any>;
}
