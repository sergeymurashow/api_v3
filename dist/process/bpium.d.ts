import Runner, { Params } from "./runner";
/**
 * @constructor
 * @typeDef
 * {@link Runner}
 * @params
 * {@link Params}
 * @desc Run Bpium processes
 */
export declare class BpiumProcessRunner extends Runner {
    params: Params;
    constructor(params: Params);
}
