import { Headers, Matrix } from "../../types"
import _ from 'lodash'


const regs = {
	shipnameReg: new RegExp(/SHIP\s*NAME\s*VOYAGE/),
	dischPortReg: new RegExp(/DISCH\s*PORT/),
	loadingPortReg: new RegExp(/LOADING\s*PORT/)
}

function findVoyageString(str): Headers.Manifest {
	return str.find(fi => {
		let fiStr = Object.values(fi).join(' | ')
		return regs.shipnameReg.test(fiStr)
	})
}

function getValueByReg(strObj: Headers.Manifest, reg: RegExp): string {
	let tmp: string
	for (let i in strObj) {
		let value: string = strObj[i]
		if (reg.test(value)) {
			tmp = i
		}
		else if (value && value.length && tmp) {
			return value
		}
	}
}

function makeInfoString( table: ManifestGetVoyagePort ) {
	let rows = table.map( m => {
		return m.row
	})
	rows = _.uniq( rows )
	return rows.map( m => {
		let values = table.filter( fi => fi.row === m)
		return values.map( m => m.value )
	})
}

export type ManifestGetVoyagePort = Matrix[]

interface ManifestGetVoyagePortOut {
	vesselVoyage: string
	portCountry: string
	loadingPort: string
}


/**
 * 
 * @param table Parsed table in Type Headers.Manifest
 * @return vesselVoyage and portCountry
 * 
 */
export default function manifestGetVoyagePort(table: ManifestGetVoyagePort ): ManifestGetVoyagePortOut {
	const stringWithShipname = findVoyageString(makeInfoString( table ))
	const vesselVoyage = getValueByReg(stringWithShipname, regs.shipnameReg)
	const portCountry = getValueByReg(stringWithShipname, regs.dischPortReg).split(',')
	const loadingPort = getValueByReg(stringWithShipname, regs.loadingPortReg).split(',')
	return {
		vesselVoyage,
		portCountry: portCountry[0],
		loadingPort: loadingPort[0]
	}
}


