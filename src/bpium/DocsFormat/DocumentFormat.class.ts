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
import PostContract from "../PostDataToBpium/PostContract.slass";

export default class DocumentFormat {
	bookingsCollection: Booking[];
	cache: { [key: string]: any };
	connection: GetBpium;
	constructor(bookingsCollection: Booking[]) {
		this.bookingsCollection = bookingsCollection;
		this.connection = new GetBpium();
		this.cache = new Map();
	}

	async setBookingIds() {
		const resp = await new GetBooking(this.bookingsCollection.map(m => m.bookingId)).bookings
		if (!resp) return this;
		resp.forEach(b => {
			this.cache.set(b.values[5], b)
		})
		return this
	}

	async setVoyage() {
		const voyage = _.uniq(this.bookingsCollection.map(m => m.voyageNumber))[0]
		const resp = await new GetVoyage(voyage).voyage
		if (!resp) return this;
		this.cache.set(voyage, resp)
		return this
	}

	async setPoints() {

		const voyage = _.uniq(this.bookingsCollection.map(m => m.voyageNumber))[0]

		const points = _.uniq(
			_.flatten(this.bookingsCollection.map(m => [m.from, m.to]))
		)

		const resp = await new GetPoints(voyage, points).points
		if (resp) {
			resp.forEach(p => {
				let pointName = p.values && p.values[2][0]
				if (pointName) {
					this.cache.set(p.values[2][0].recordTitle, p)
				}
			})
		}

		const emptyPoints = findEmptyItems(points, resp.map(m => m.values[2][0].recordTitle))
		if ( !emptyPoints.length) {
			const promises = emptyPoints.map(async p => {
				let postPoints = await new PostPoint().addPoint(this.cache.get(voyage), p as string)
				if (postPoints) {
					this.cache.set(p, postPoints)
				}
			})
			await Promise.all(promises)
		}
		return this
	}

	async setContract() {

		const contracts = _.uniq(this.bookingsCollection.map(m => m.contract).filter( c => c ))

		const resp = await new GetContract(contracts).contracts
		if (!resp) return this;
		resp.forEach(c => {
			this.cache.set(c.values[2].replace(/\s+.*/g, ''), c)
		})

		const emptyContracts = findEmptyItems(resp.map(m => m.values[2].replace(/\s+.*/g, '')), contracts)
		if ( emptyContracts.length ) {
			const promises = emptyContracts.map(async p => {
				let postContracts = await new PostContract().addContract(p as string)
				if (postContracts) {
					this.cache.set(p, postContracts)
				}
			})

			await Promise.all(promises)
		}

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