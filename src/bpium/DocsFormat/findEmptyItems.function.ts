import _ from 'lodash'

export default function findEmptyItems(where: (string | number)[], what: (string | number)[] ): (string | number)[] {

	let returnArray: (string | number)[] = _.difference( what, where )

	return returnArray
}