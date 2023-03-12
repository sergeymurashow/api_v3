import DocumentsParser from "../DocumentsParser";
import { Headers } from '../../types';
export default interface ManifestParser {
    table: Headers.Manifest[];
    startIndex: number;
}
export default class ManifestParser extends DocumentsParser {
    constructor(params: any);
    get parsed(): never[];
}
