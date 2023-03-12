export declare class ErrorsCollector extends Error {
    errCollection: Array<string>;
    errLog: (data: string) => void;
    getErrors: () => Array<string>;
    constructor(message: string);
}
