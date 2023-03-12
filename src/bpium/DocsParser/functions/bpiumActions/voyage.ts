import bpiumConnect from "../../bpConnect";

export default class InformationByVoyage {
	voyageNumber: string
	constructor(voyageNumber: string) {
		this.voyageNumber = voyageNumber
	}

	async findVessel(voyageNumber: string = this.voyageNumber) {
		const searchText = voyageNumber

		const withFieldsAdditional = true

		const params = { withFieldsAdditional, searchText }

		const foundVessel = await bpiumConnect.getRecords('74', params)
		return foundVessel
	}

	async getVoyage(voyageNumber: string = this.voyageNumber) {
		const searchText = voyageNumber

		const withFieldsAdditional = true

		const params = { withFieldsAdditional, searchText }

		const foundBooking = await bpiumConnect.getRecords('73', params)
		return foundBooking
	}

}