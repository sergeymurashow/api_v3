import utils from "../../../utils"
import _ from 'lodash'

export const ejectFieldMap = (data, fieldName) => {
	return _.uniq(data.map(m => m[fieldName]))
}

export const vol = (data: string) => {
	if (!data) throw new Error('Empty volume!')
	data = utils.clearString(data)
	return data
}

export const number = (data: string) => {
	if (!data) throw new Error('Empty number!')
	data = utils.clearString(data)
	return data
}


export const mension = (data: string) => {
	if (!data) throw new Error('Empty mension!')
	const mensReg = /(20|40)/
	if (!mensReg.test(data)) throw new Error(`Unknown mension ${data}`)
	data = utils.clearString(data)
	const containerMension = data.replace(/[^0-9]+/, '')
	return containerMension
}

export const type = (data: string) => {
	if (!data) throw new Error('Empty type!')
	data = utils.clearString(data)
	const containerType = data.replace(/[^a-zA-Z]+/, '')
	return containerType
}

export const remark = (data: string) => {
	if (!data) throw new Error('Empty Remark!')
	return data
}

export const gWeight = (data: string | number): string => {
	if (!data) throw new Error('Empty gross weight!')
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '').replace(/\./, ',')
}

export const cbm = (data: string | number): string => {
	if (!data) throw new Error('Empty cbm!')
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '').replace(/\./, ',')
}

export const tWeight = (data: string | number): string => {
	if (!data) throw new Error('Empty tare weight!')
	if (typeof data === 'number') data = data.toString()
	return data.replace(/[^\d,.]/, '').replace(/\./, ',')
}

export const freight = (data: string) => {
	if (!data) throw new Error('Empty freight!')
	const freightReg = /(freight|collect)/gi
	if (!freightReg.test(data)) new Error('Wrong freight/collect!')
	data = utils.clearString(data)
	return data.match(freightReg)[0].toLowerCase()
}

export const owner = (data: string) => {
	if (!data) throw new Error('Empty owner!')
	const ownerReg = /(soc|coc)/gi
	if( !ownerReg.test( data )) throw new Error('Wrong owner!')
	data = utils.clearString(data)
	return data.match(ownerReg)[0].toLowerCase()
}

export const packages = (data: string) => {
	if (!data) throw new Error('Empty packages!')
	data = utils.clearString(data)
	return data
}

export const seal = (data: string) => {
	if (!data) throw new Error('Empty seal!')
	data = utils.clearString(data)
	return data
}