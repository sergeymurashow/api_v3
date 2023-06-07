//* NPM modules
import _ from 'lodash'
//*

//* Interfaces
import { Booking, ParseError } from '../types'
//*

//* Indoor files
import ManifestParser from './ManifestParser'
import ReportParser from './ReportParser'
import ContractParser from './ContractsParser'
//*

export default class ParseExcel {
	fileName: string
	docType: string
	constructor(
		fileName,
		docType
	) {
		this.fileName = fileName
		this.docType = docType
	}
	get booking(): (Booking | ParseError)[] {
		switch (this.docType) {
			case 'manifest':
				return new ManifestParser( this.fileName ).parsed.map( m => Object.assign(m, {fileName: this.fileName}))
				break;
			case 'report':
				return new ReportParser( this.fileName ).parsed.map( m => Object.assign(m, {fileName: this.fileName}))
				break;
		}
	}

	get contract() {
		const parsedContracts = new ContractParser( this.fileName ).parsed
		return 
	}
}







