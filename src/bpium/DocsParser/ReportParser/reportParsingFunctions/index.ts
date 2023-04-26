import utils from "../../../utils"
import _ from 'lodash'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

export const ejectFieldMap = ( data, fieldName ) => {
	return _.uniq(data.map( m => m[fieldName]))
}

/*
Transform and pretty data
*/

export const bookingId = (data: string) => {
	data = utils.clearString(data)
	const chk = data.toString().match(/(INT|INJIAN)\d+/)
	if (chk) {
		return data
	} else {
		throw new Error('Wrong booking ID!')
	}
}

export const applicationDate = (data: string) => {
	if (data) {
		data = makeDate(utils.clearString(data))
		return data
	} else {
		throw new Error('Wrong application date!')
	}
}

export const contract = (data: string) => {
	if (!data) throw new Error('Wrong contract number!')
	try {
		data = utils.transcribeContractNumber(utils.clearString(data))
	} catch (e) {
		throw new Error(`Contract Error: ${e}`)
	}
	const contractNumber = data //.replace(/[^0-9]+/, '')
	return contractNumber
}

export const voyageNumber = (data: string) => {
	data = utils.getVoyageNumber(data)
	if (data) {
		return data
	} else {
		throw new Error('Wrong voyage number')
	}
}

export const containersCount = (data: string) => {
	const result = +utils.clearString(data)
	if (result) {
		return result
	} else {
		throw new Error('Wrong number of containers')
	}

}

export const containersMension = (data: string) => {
	if (!data) throw new Error('Wrong container mension!')
	try {
		data = utils.clearString(data)
	} catch (e) {
		throw new Error(`Container type Error: ${e}`)
	}
	const containerMension = data.replace(/[^0-9]+/, '')
	return containerMension
}

export const containerType = (data: string) => {
	if (!data) throw new Error('Wrong container type!')
	try {
		data = utils.clearString(data)
	} catch (e) {
		throw new Error(`Container type Error: ${e}`)
	}
	const containerType = data.replace(/[^a-zA-Z]+/, '')
	return containerType

}

export const gWeight = (data: string | number): string => {
	if (!data) {
		return null
	}
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '')
}

export const shipper = (data: string) => {
	data = utils.clearString(data)
	if (data) {
		return data
	} else {
		throw new Error('Wrong shipper!')
	}
}

export const port = (data: string) => {
	data = utils.clearString(data)
	if (data) {
		return data
	} else {
		throw new Error('Wrong port!')
	}
}

export const freight = (data: string) => {
	data = utils.clearString(data)
	if (data) {
		return data
	} else {
		throw new Error('Wrong freight!')
	}
}

export const owner = (data: string) => {
	if (data) {
		data = utils.clearString(data)
		return data
	} else {
		throw new Error('Wrong SOC-COC!')
	}
}



/*
General functions
*/

function makeDate(chinaDate: string): string {
	dayjs.extend(customParseFormat)
	dayjs.extend(utc)
	const dateFormat = (cd) => {
		if (/(\d{1,2}\.*){3}$/.test(cd)) return 'M.D.YY'
		if (/(\d{1,2}\/*){3}$/.test(cd)) return 'D/M/YY'
		if (/\d{4}\/\d{1,2}\/\d{1,2}/.test(cd)) return 'YYYY/MM/DD'
	}
	let fixedDate = dayjs((chinaDate), dateFormat(chinaDate)).format('YYYY-MM-DDT00:00:00')
	if( !dayjs(fixedDate).isValid() ) throw new Error( 'Wrong application date!' )
	return fixedDate
}

