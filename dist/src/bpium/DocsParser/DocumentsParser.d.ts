import { Obj } from '../types/index';
export default interface DocumentsParser {
    constructor(filePath: string): any;
    fixVoyageNumber: DocumentsParser.FixVoyageNumber;
    bigSheet: DocumentsParser.matrix[];
    testSheet?: Obj;
    filePath?: string;
}
export declare namespace DocumentsParser {
    interface FixVoyageNumber {
        (voyageNumber: string): any;
    }
    type matrix = Obj;
}
export default class DocumentsParser {
    fixVoyageNumber: DocumentsParser.FixVoyageNumber;
    constructor(filePath: string);
    private parseSheet;
}
