import { Booking } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import GetBooking from "../GetDataFromBpium/GetBooking.class";
import GetPoints from "../GetDataFromBpium/GetPoints.class";
import GetContract from "../GetDataFromBpium/GetContract.class";
import GetVoyage from "../GetDataFromBpium/GetVoyage.class";

import PostBooking from "../PostDataToBpium/PostBooking.class";
import PostPoint from "../PostDataToBpium/PostPoint.class";

import findEmptyItems from "./findEmptyItems.function";

import testBooking from '../../../testData/testBooking.json'
import _ from "lodash";
import PostContract from "../PostDataToBpium/PostReport.slass";

function renameIdKey(input: any): { recordId: string, catalogId: string } {
	Object.assign(input, { recordId: input.id })
	delete input.id
	return input
}

export default class DocumentFormat {
	bookingsCollection: Booking[];
	cache: { [key: string]: any };
	bookingsCache: { [key: string]: any };
	connection: GetBpium;
	constructor(bookingsCollection: Booking[]) {
		this.bookingsCollection = bookingsCollection;
		this.cache = new Map();
		this.bookingsCache = new Map();
		this.bookingsCache.set('post', {})
		this.bookingsCache.set('patch', {} as Array<any>)
	}

	async setBookingIds() {
		const resp: Array<any> = await new GetBooking(this.bookingsCollection.map(m => m.bookingId)).bookings
		resp.forEach(b => {
			this.bookingsCache.get('patch')[b.values[5] as unknown as string] = b
		})

		findEmptyItems(resp.map(m => m.values[5].toString()), this.bookingsCollection.map(m => m.bookingId))
			.forEach(b => {
				this.bookingsCache.get('post')[b] = {}
			})

		return this
	}

	async setVoyage() {
		const voyages = _.uniq(this.bookingsCollection.map(m => m.voyageNumber))

		for (let voyage of voyages) {
			const resp = await new GetVoyage(voyage).voyage
			if (!resp) continue;
			this.cache.set(voyage, resp.map(m => {
				let newM = renameIdKey(m)
				return {
					recordId: newM.recordId,
					catalogId: newM.catalogId,
				}
			}))
		}
		return this
	}

	async setPoints() {

		const voyage = _.uniq(this.bookingsCollection.map(m => m.voyageNumber))[0]

		const points = _.uniq(
			_.flatten(this.bookingsCollection.map(m => [m.from, m.to]))
		)

		const resp = await new GetPoints(this.cache.get(voyage), points).points
		if (resp) {
			resp.forEach(p => {
				let pointName = p.values && p.values[2][0]
				if (pointName) {
					this.cache.set(p.values[2][0].recordTitle, [renameIdKey(p)]
						.map(m => { return { recordId: m.recordId, catalogId: m.catalogId } }))
				}
			})
		}

		const emptyPoints = findEmptyItems(points, resp.map(m => m.values[2][0].recordTitle))
		if (!emptyPoints.length) {
			const promises = emptyPoints.map(async p => {
				let postPoints = await new PostPoint().addPoint(this.cache.get(voyage), p as string)
				if (postPoints) {
					this.cache.set(p, postPoints.map(m => renameIdKey(m))
						.map(m => { return { recordId: m.recordId, catalogId: m.catalogId } }))
				}
			})
			await Promise.all(promises)
		}
		return this
	}

	async setContract() {

		const contractsNumbers = _.uniq(this.bookingsCollection.map(m => m.contract).filter(c => c))

		const contracts = await new GetContract(contractsNumbers).contracts
		if (!contracts) return this;
		contracts.forEach(c => {
			this.cache.set(c.values[2].replace(/\s+.*/g, ''), 
			[renameIdKey(c)]
				.map(m => { return { recordId: m.recordId, catalogId: m.catalogId } })
		)})

		const emptyContracts = findEmptyItems(contracts.map(m => m.values[2].replace(/\s+.*/g, '')), contractsNumbers)
		if (emptyContracts.length) {
			const promises = emptyContracts.map(async p => {
				let postContracts = await new PostContract().addContract(p as string)
				if (postContracts) {
					this.cache.set(p, [renameIdKey(postContracts)])
				}
			})

			await Promise.all(promises)
		}
	}

	async setClients() {
		
	}
}


// ; (async () => {
// 	let t = await new DocumentFormat(testBooking)
// 	await t.setVoyage()
// 	await t.setContract()
// 	await t.setBookingIds()
// 	await t.setPoints()
// 	let q
// })()