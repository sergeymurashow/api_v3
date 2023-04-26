export default function transcribeContractNumber(contractNumber: string): any {

	const contractTypes = {
		'transit': '00-INL-00-0000'
	}

	const reg = /(\d+)/g
	const digitsFromContractNumber = contractNumber.match(reg)
	if( !digitsFromContractNumber ) {
		return contractNumber //throw new Error( 'Wrong contract number' )
	}
	return replacer( digitsFromContractNumber )
}

function replacer(arr: Array<any>): string {
	return `${arr[0]}-INL-${arr.slice(1).join('-')}`
}


// let t = transcribeContractNumber( '05 InL-78-1-2022' )
// let t = transcribeContractNumber( 'Tetra' )

// console.log( t )