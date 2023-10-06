import { Booking, containerFieldFromBpium } from "../../types";
import FormatManifest from "./FormatManifest.class";
import FormatReport from "./FormatReport.class";


export type DocType = 'manifest' | 'report'

export type Method = 'post' | 'patch'

export type FormattedData = {
	data: {[key: number]: any}
	method: Method
	recordId?: string | number
	containers?: {[key: string | number]: any}[]
}

export default class DocsFormat {
	data: ( Booking )[];
	docType: DocType;
	constructor( data: Booking[], docType: DocType ) {
		this.data = data;
		this.docType = docType;
	}

	async bpiumFormat(): Promise<any> {
		switch( this.docType ) {
			case 'manifest': return await (new FormatManifest(this.data))
			break;
			case 'report': return await (new FormatReport(this.data))
			break;
		 }
	}
}
