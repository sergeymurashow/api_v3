import _ from 'lodash'
import { matrix, Container, Headers } from '../../types'
import * as parsingTools from '../prettyData'

export type ContainersParse = {
	type: string,
	mension: string,
	freight: string,
	owner: string
}

export default function containersParse(data: Headers.Contract): ContainersParse[] {
	if (!data.TYPE) throw new Error('Wrong type!')
	if (!data.NUMBEROFCONTAINER) throw new Error('Wrong number of containers!')

	const chkMultiTypesReg = /(20|40)/g
	const chkMultiTypes = data.TYPE.match(chkMultiTypesReg).length === 1 ? false : true
	if (!chkMultiTypes) return containersGenerate({
		count: data.NUMBEROFCONTAINER,
		type: parsingTools.containerType(data.TYPE),
		mension: parsingTools.containersMension(data.TYPE),
		freight: data.FREIGHTTERM,
		owner: data.SOCCOC
	}) as ContainersParse[]
	else {
		const typesReg = /(\d)+[*Xx](20|40)\w+/g
		const types = data.TYPE.match(typesReg)
		const mapped = types.map(m => {
			let ansArr = []
			const typeReg = /(?<count>\d+).*?(?<type>(20|40)\w+)/
			let parsedType = m.match(typeReg)
			if (parsedType.groups) {
				Object.assign(parsedType.groups, { freight: data.FREIGHTTERM }, { owner: data.SOCCOC })
				let req = parsedType.groups
				ansArr = ansArr.concat(containersGenerate(req))
			}
			return ansArr
		})
		return _.flatten(mapped) as ContainersParse[]
	}
}

function getContainer(data: matrix): Container {
	let resp
	try {
		resp = {
			number: 'reported',
			freight: data.freight,
			owner: data.owner,
			type: parsingTools.containerType(data.type),
			mension: parsingTools.containersMension(data.mension),
		}
	} catch (e) {
		console.log(e)
	}
	return resp
}

function containersGenerate({ count, type, mension, freight, owner }) {
	const resp = []
	for (let i = 1; i <= count; i++) {
		resp.push(getContainer({
			type,
			mension,
			freight,
			owner
		}))
	}
	return resp
}