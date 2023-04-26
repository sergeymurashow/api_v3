import { Booking } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import getBookingButton from "./GetBookingButton.function";

export default class FormatManifest {
	bookings: { [key: string]: any };
	cache: { [key: string]: any };
	connection: GetBpium;
	constructor(booking: Booking[]) {
		this.bookings = booking;
		this.connection = new GetBpium();
	}

	async result(bookings = this.bookings) {

		return await Promise.all(bookings.map(async (b, i, a) => {
			return {
				5: b.bookingId,
				91: (async () => {
					if (!b.voyageNumber) return undefined;
					if (this.cache[b.voyageNumber]) {
						return this.cache[b.voyageNumber]
					}
					const voyage = await this.connection.records(
						139,
						{ 4: b.voyageNumber }
					)
					this.cache[b.voyageNumber] = voyage;
					return voyage;
				})(),
				172: b.packType,
				145: b.gWeight,
				108: b.shipper,
				120: b.mark,
				130: (async () => {
					if (!b.bookingId) return undefined;
					if (this.cache[b.bookingId]) {
						return this.cache[b.bookingId]
					}
					const booking = await this.connection.records(
						73,
						{ 5: b.bookingId }
					)
					this.cache[b.bookingId] = booking;
					if (!booking) return undefined;
					return this.cache[b.bookingId].values[130]
				})(),
				63: getBookingButton('owner', b.owner),
				163: (async () => {
					if (this.cache[b.from]) {
						return this.cache[b.from]
					}
					const portFrom = await this.connection.records(
						140,
						{
							11: b.from,
							5: this.cache[b.voyageNumber]
						}
					)
					this.cache[b.from] = portFrom;
					return portFrom;
				})(),
				164:(async () => {
					if (this.cache[b.To]) {
						return this.cache[b.To]
					}
					const portTo = await this.connection.records(
						140,
						{
							11: b.To,
							5: this.cache[b.voyageNumber]
						}
					)
					this.cache[b.To] = portTo;
					return portTo;
				})(),
				165: [1],
				116: b.freight.map(m => getBookingButton('freightTerm', m)),
				169: b.applicationDate && b.applicationDate.length ? b.applicationDate : undefined,
				132: b.mension.map(m => getBookingButton('mension', m)),
				173: b.type.map(m => getBookingButton('type', m)),
				175: b.containers.filter(container => container.mension == '20').length,
				176: b.containers.filter(container => container.mension == '40').length,
				133: b.containers ? b.conatiners.length : 0,
				146: b.containers ? ((containers = b.containers) => {
					return containers.map(m => m.tWeight)
						.reduce((c, i) => {
							return c + i
						}, 0)
				})() : 0,
				148: b.containers ? ((containers = b.containers) => {
					return containers.map(m => m.packages)
						.reduce((c, i) => {
							return c + i
						}, 0)
				})() : 0,
			}

		}
		))

	}

}