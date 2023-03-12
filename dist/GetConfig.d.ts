interface GetConfig {
    port: string;
    protocol: string;
    bpiumUrl: string;
    receiver: string;
    callbackParsed: string;
    callbackTariff: string;
    callbackNonValid: string;
}
declare class GetConfig {
    constructor(configPath: any);
}
declare const bpiumConfig: GetConfig;
export default bpiumConfig;
