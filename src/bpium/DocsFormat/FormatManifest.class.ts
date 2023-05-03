import { Booking } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import getBookingButton from "./GetBookingButton.function";
import DocumentFormat from "./DocumentFormat.class";

export default class FormatManifest {
	bookings: Booking[];
	cache: { [key: string]: any };
	connection: GetBpium;
	constructor(booking: Booking[]) {
		this.bookings = booking;
		this.connection = new GetBpium();
		this.cache;
	}

	async result(bookings = this.bookings) {

		// Сделать наполнение кеша в начале

		const formattedManifest = await Promise.all(bookings.map(async (b, i, a) => {
			if (!this.cache) {
				const dataFromBpium = new DocumentFormat(this.bookings)
				await dataFromBpium.setBookingIds()
				await dataFromBpium.setVoyage()
				await dataFromBpium.setPoints()
				this.cache = dataFromBpium.cache
			}

			return {
				5: b.bookingId,
				91: this.cache.get(b.voyageNumber),
				172: b.packType,
				145: b.gWeight,
				108: b.shipper,
				120: b.mark,
				130: this.cache.get(b.contract),
				63: b.owner.map(o => getBookingButton('owner', o)),
				163: this.cache.get(b.from),
				164: this.cache.get(b.to),
				165: [1],
				116: b.freight.map(m => getBookingButton('freightTerm', m)),
				169: b.applicationDate && b.applicationDate.length ? b.applicationDate : undefined,
				132: b.mension.map(m => getBookingButton('mension', m)),
				173: b.type.map(m => getBookingButton('type', m)),
				175: b.containers.filter(container => container.mension == '20').length,
				176: b.containers.filter(container => container.mension == '40').length,
				133: b.containers ? b.containers.length : 0,
				146: b.containers ? ((containers = b.containers) => {
					return containers.map(m => {
						if (typeof m.gWeight == 'number') return m.gWeight
						else {
							return +m.gWeight.replace(/,/, '.')
						}
					})
						.reduce((c, i) => {
							return c + i
						}, 0)
				})() : 0,
				148: b.containers ? ((containers = b.containers) => {
					return containers.map(m => {
						if (typeof m.packages == 'number') return m.packages
						else {
							return +m.packages.replace(/,/, '.')
						}
					})
						.reduce((c, i) => {
							return c + i
						}, 0)
				})() : 0,
			}
		}
		))
		return formattedManifest
	}
}