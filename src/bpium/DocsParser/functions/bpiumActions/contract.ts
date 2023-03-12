import bpiumConnect from "../../bpConnect";

async function findContract(contractNumber: string) {
	const filters = [
		{
			fieldId: 2,
			value: contractNumber
		}
	]
	const withFieldsAdditional = true

	const params = {withFieldsAdditional, filters}

	const foundContract = await bpiumConnect.getRecords('114', params)
	return foundContract

}

async function createContract(contractNumber: string) {
	const data = {
		2: contractNumber,
		12: ['1']
	}
	return await bpiumConnect.postRecord('114', data)
}