import utils from "../../../utils"
import _ from 'lodash'

import dayjs from 'dayjs'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import utc from 'dayjs/plugin/utc'

export const ejectFieldMap = (data, fieldName) => {
	return _.uniq(data.map(m => m[fieldName]))
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

export const voyageNumber = (data: string) => {
	data = utils.getVoyageNumber(data)
	if (data) {
		return data
	} else {
		throw new Error('Wrong voyage number')
	}
}

export const pkgs = (data: string | number): string => {
	if (!data) throw new Error('Empty PKGS!')
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '')
}

export const packType = (data: string | number): string => {
	if (!data) throw new Error('Empty Package Type!')
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '')
}

export const goods = (data: string): string => {
	if (!data) throw new Error('Empty Goods!')
	return data
}

export const shipper = (data: string) => {
	if (!data) throw new Error('Empty Shipper!')
	return data
}

export const consignee = (data: string) => {
	if (!data) throw new Error('Empty Consignee!')
	return data
}

export const notifyParty = (data: string) => {
	if (!data) throw new Error('Empty Notify party!')
	return data
}

export const mark = (data: string) => {
	if (!data) throw new Error('Empty mark!')
	return data
}

export const port = (data: string) => {
	data = utils.clearString(data)
	if (data) {
		return data
	} else {
		throw new Error('Wrong port!')
	}
}
export const gWeight = (data: string | number): string => {
	if (!data) throw new Error('Empty gross weight!')
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '').replace(/\./, ',')
}

/*
General functions
*/

function makeDate(chinaDate: string): string {
	dayjs.extend(customParseFormat)
	dayjs.extend(utc)
	const dateFormat = (cd) => {
		if (/(\d{1,2}\.*){3}$/.test(cd)) return 'M.D.YY'
		if (/(\d{1,2}\/*){3}$/.test(cd)) return 'M/D/YY'
		if (/\d{4}\/\d{1,2}\/\d{1,2}/.test(cd)) return 'YYYY/MM/DD'
	}
	let fixedDate = dayjs((chinaDate), dateFormat(chinaDate)).format('YYYY-MM-DDT00:00:00')
	if (!dayjs(fixedDate).isValid()) throw new Error('Wrong application date!')
	return fixedDate
}

