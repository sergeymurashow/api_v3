import getBookingsByVoyage from "./functions/getBookingsByVoyage.function";
import getContainers from "./functions/getContainers.function";
import prettyContainer from "./functions/prettyContainer.function";
import prettyBooking from "./functions/prettyBooking.function";
import mergeData from "./functions/mergeData.function";
import MakeExcel from "./MakeExcel/MakeExcel.class";
import UploadFile from "../../Connection/UploadFile.class";

import _ from "lodash";
import PatchBpium from "../../Connection/PatchBpium.class";

export default class CollectionReport {
	private _bookings: any
	private _containers: any
	voyageLink: {
		catalogId: string,
		recordId: string,
		fieldId: string | number,
	}
	mergedData
	constructor(voyageLink: {
		catalogId: string,
		recordId: string,
		fieldId: string | number
	}) {
		this.voyageLink = voyageLink
		this._bookings = getBookingsByVoyage(this.voyageLink)
		this._containers = getContainers(this.voyageLink)
	}

	private prettyBookings() {
		return this._bookings.then((bookings: any) => bookings.map((booking: any) => prettyBooking(booking.values)))
	}

	private prettyContainers() {
		return this._containers.then((containers: any) => containers.map((container: any) => prettyContainer(container.values)))
	}

	public async getCollection() {

		if (!this._bookings || !this._containers) return { status: 'There is no bookings', code: 200 }

		const { catalogId, recordId, fieldId } = this.voyageLink

		const prettiedBookings = await this.prettyBookings()
		const prettiedContainers = await this.prettyContainers()

		this.mergedData = mergeData(prettiedBookings, prettiedContainers)

		const groupedData = _.groupBy(this.mergedData, 'from')

		const filesDirs: string[] = []

		for (const portFromKey in groupedData) {
			try {
				let byPortFrom = groupedData[portFromKey]
				const { from: portFrom, to: portTo, countryFrom, countryTo, vessel, voyageNumber: voyage } = byPortFrom[0]
				const makeExcel = new MakeExcel({ portFrom, portTo, countryFrom, countryTo, vessel, voyage })
				byPortFrom.forEach((booking: any) => makeExcel.setBooking(booking))
				const fileDir: string = makeExcel.makeFile() as string

				filesDirs.push(fileDir)
			} catch (error) {
				console.error('filesDirsError', error)
			}
		}

		console.log('filesDirs', filesDirs)

		const uploadFiles = await Promise.all(filesDirs.map((fileDir: any) => {

			const uploadFile = new UploadFile(fileDir)
			uploadFile.setOptions(catalogId, recordId, fieldId)
			return uploadFile.upload()

		}))

		const patchBpium = new PatchBpium()

		const patch = await patchBpium.record(catalogId, recordId, { [fieldId]: uploadFiles.map((file: any) => ({ id: file.id })) },)
		return { status: 'OK', code: 200 }
	}
};

// (async () => {
// 	const collectionReport = new CollectionReport(
// 		{
// 			catalogId: '139',
// 			recordId: '108',
// 			fieldId: 10
// 		},
// 	)
// 	await collectionReport.getCollection()
// 	console.log(collectionReport.mergedData)
// })();

