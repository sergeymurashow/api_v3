import { Obj } from "../types";
import { DocType } from './samples';
type DataCollector = {
    tableHeader?: any;
    headerTemplate?: any;
    renamedTable?: any;
    startIndex?: any;
};
export default interface FindTableTitle {
    docType: DocType;
    tableArray: Obj[];
    dataCollector?: DataCollector;
}
export default class FindTableTitle {
    constructor(tableArray: Obj[], docType: DocType);
    private findString;
    private makeTemplate;
    private renameColumns;
    getTable(): {
        table: any;
        startIndex: any;
    };
}
export {};
