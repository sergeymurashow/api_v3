import _ from "lodash";

import GetBpium from "../../Connection/GetBpium.class";
import getBookingButton from "./getBookingButton.function";
import DocumentFormat from "./DocumentFormater.class";

import { Booking } from "../../types";
import { FormattedData, Method } from "./index";
import FormatContainer from "./ContainersFormat/FormatContainer.class";

export default class FormatManifest{
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

	async result(bookings = this.bookings): Promise<FormattedData[]> {

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

		const formattedManifest: FormattedData[] = await Promise.all(bookings.map(async (b, i, a) => {

			const voyage = this.cache.get(b.voyageNumber)
			const freightTerm = b.freight.map(m => getBookingButton('freightTerm', m.toUpperCase()))
			const mension = b.mension.map(m => getBookingButton('mension', m.toUpperCase()))
			const type = b.type.map(m => getBookingButton('type', m.toUpperCase()))
			const applicationDate = b.applicationDate && b.applicationDate.length ? b.applicationDate : undefined
			const contract = this.patch[b.bookingId] ? this.patch[b.bookingId].values[130].map( m => ({ recordId: m.recordId, catalogId: m.catalogId })) : undefined

			return {
				data: {
					5: b.bookingId,
					63: b.owner.map(o => getBookingButton('owner', o.toUpperCase())).filter(o => o),
					91: voyage,
					108: b.shipper,
					109: b.consignee, // consignee
					110: b.notifyParty, // notify
					116: freightTerm,
					120: b.mark,
					130: contract,
					132: mension,
					133: b.containers ? b.containers.length : 0,
					145: b.gWeight,
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
					163: this.cache.get(b.from),
					164: this.cache.get(b.to),
					165: [1],
					169: applicationDate,
					172: b.packType,
					173: type,
					175: b.containers.filter(container => container.mension == '20').length,
					176: b.containers.filter(container => container.mension == '40').length,
					177: [2],
					180: b.containers ? _.uniq(b.containers.filter(f => f.dropPort).map(m => m.dropPort)).length ?? undefined : undefined,
					181: b.goods
				},
				method: this.post[b.bookingId] ? 'post' : 'patch' as Method,
				containers: await new FormatContainer(b.containers, {
					voyage,
					packType: b.packType,
					applicationDate,
					contract,
				}).result(),
				recordId: this.patch[b.bookingId] ? this.patch[b.bookingId].id : undefined
			}
		}
		))
		return formattedManifest
	}
}