import _ from "lodash";

import { Booking } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import getBookingButton from "./getBookingButton.function";
import DocumentFormat from "./DocumentFormater.class";

export default class FormatReport {
	bookings: Booking[];
	cache: { [key: string]: any };
	connection: GetBpium;
	post: { [key: string]: any };
	patch: { [key: string]: any };
	constructor(booking: Booking[]) {
		this.bookings = booking;
		this.connection = new GetBpium();
		this.cache;
		this.post;
		this.patch;
	}

	async result(bookings = this.bookings) {

		// Сделать наполнение кеша в начале

		if (!this.cache) {
			const dataFromBpium = new DocumentFormat(this.bookings)
			await dataFromBpium.setBookingIds()
			await dataFromBpium.setVoyage()
			await dataFromBpium.setPoints()
			await dataFromBpium.setContract()
			this.cache = dataFromBpium.cache
			this.post = dataFromBpium.bookingsCache.get('post')
			this.patch = dataFromBpium.bookingsCache.get('patch')
		}

		const formattedReport = await Promise.all(bookings.map(async (b, i, a) => {

			if (this.patch[b.bookingId]) {
				return {
					data: {
						130: this.cache.get(b.contract),
						169: b.applicationDate && b.applicationDate.length ? b.applicationDate : undefined,
						180: b.dropPort ? _.uniq(b.dropPort)[0] : undefined,
					},
					method: this.post[b.bookingId] ? 'post' : 'patch',
					recordId: this.patch[b.bookingId] ? this.patch[b.bookingId].id : undefined
				}
			}
			else if ( this.post[b.bookingId] ) { 
			return {
				data: {
					5: b.bookingId, // bookingId
					63: b.owner.map(o => getBookingButton('owner', o.toUpperCase())).filter(o => o),
					91: this.cache.get(b.voyageNumber),
					108: b.shipper, // shipper
					109: b.consignee, // consignee
					110: b.notifyParty, // notify
					116: b.freight.map(m => getBookingButton('freightTerm', m.toUpperCase())),
					120: b.mark, // mark
					130: this.cache.get(b.contract),
					132: b.mension.map(m => getBookingButton('mension', m.toUpperCase())),
					133: b.containers ? b.containers.length : 0,
					146: b.gWeight,
					163: this.cache.get(b.from),
					164: this.cache.get(b.to),
					165: [1],
					169: b.applicationDate && b.applicationDate.length ? b.applicationDate : undefined,
					172: b.packType, // packType
					173: b.type.map(m => getBookingButton('type', m.toUpperCase())),
					175: b.containers.filter(container => container.mension == '20').length,
					176: b.containers.filter(container => container.mension == '40').length,
					177: [1],
					180: b.dropPort ? _.uniq(b.dropPort)[0] : undefined,
					181: b.goods
				},
				method: this.post[b.bookingId] ? 'post' : 'patch',
				recordId: this.patch[b.bookingId] ? this.patch[b.bookingId].id : undefined
			}
		}}
		))
		return formattedReport
	}
}
