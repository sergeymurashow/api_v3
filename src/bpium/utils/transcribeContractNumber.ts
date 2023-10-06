export default function transcribeContractNumber(contractNumber: string): any {

	const regTest = /(inl|инл)/gi
	const reg = /\d+/g
	if( !regTest.test(contractNumber) ) {
		return contractNumber
	}
	const digitsFromContractNumber = contractNumber.match(reg)
	return replacer( digitsFromContractNumber )
}

function replacer(arr: Array<any>): string {
	try {
	return `${arr[0]}-INL-${arr.slice(1).join('-')}`
	} catch (e) {
		console.error(e)
	}
}
