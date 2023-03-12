import DocumentsParser from "../DocumentsParser";
import { Booking, ParseError, Headers } from '../../types';
export default interface ReportParser {
    table: Headers.Contract[];
    startIndex: number;
}
export default class ReportParser extends DocumentsParser {
    constructor(params: any);
    get parsed(): (Booking | ParseError)[];
}
