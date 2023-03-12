import { Booking, ParseError } from '../types';
export default class ParseExcel {
    fileName: string;
    docType: string;
    constructor(fileName: any, docType: any);
    get(): (Booking | ParseError)[];
}
