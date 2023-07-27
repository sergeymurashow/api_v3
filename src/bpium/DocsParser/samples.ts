import fs from 'fs'
import Path from 'path'
import { Obj } from '../types'

export type DocType = 'report' | 'manifest'
export type Sample = {
	cellName: string,
	alias: string
}


const samples = {
	'report': [
		'DATE',
		'S/C',
		'BOOKING NO',
		'NUMBER OF CONTAINER',
		'TYPE',
		'GROSS WEIGHT',
		'SHIPPER',
		'VESSEL',
		'ETD',
		'POL',
		'SOC-COC',
		'FREIGHT TERM',
		'row'
	],
	'manifest': [
		'BL NO',
		'PKGS',
		'PACKAGE TYPE',
		'G/WEIGHT',
		'GOODS',
		'SHIPPER',
		'CONSIGNEE',
		'NOTIFY PARTY',
		'MARK',
		'REMARK',
		'MENSION',
		'TYPE',
		'VOLUME',
		'CONTAINER NO',
		'SEAL',
		'PKGS',
		'G/WEIGHT',
		'CONTAINER TARE WEIGHT',
		'CBM',
		'FREIGHT',
		'CONTAINER OWNER',
		'row'
	],
	getWithAliases( docType : DocType): Sample[] {
		const tmp: Obj[] = []
		let t = this[docType]
		const mappedNames = this[docType].map( m => {
			let alias = m.replace(/[^\w\d]/g, '')
			let tryAlias = tmp.filter( f => f == alias )
			tmp.push(alias)
			if( tryAlias.length ) {
				alias = `${alias}_${tryAlias.length + 1}`
			}
			return {
				cellName: m,
				alias
			}
		})
		return mappedNames
	}
}

export default samples