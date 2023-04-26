import { Booking } from "../types";
import FormatManifest from "./FormatManifest.class";
import FormatReport from "./FormatReport.class";


export type DocType = 'manifest' | 'report'

export default class DocsFormat {
	data: Booking[];
	docType: DocType;
	constructor( data: Booking[], docType: DocType ) {
		this.data = data;
		this.docType = docType;
	}

	async bpiumFormat() {
		switch( this.docType ) {
			case 'manifest': return await (new FormatManifest(this.data)).result()
			break;
			case 'report': return await (new FormatReport(this.data)).result()
			break;
		 }
		
	}



}
