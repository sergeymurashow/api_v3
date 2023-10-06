import { Booking, bookingsFromBpium } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import getBookingButton from "../DocsParser/DocsFormat/getBookingButton.function";

export default class GetBooking {
	bookingIds: Array<string> 
	bookings: Promise<{values: bookingsFromBpium}[]>
	constructor( bookingIds: Array<string> ) {
		this.bookingIds = bookingIds;
		this.bookings = (async () => {
			const connection = new GetBpium();
			const bookings = await connection.records(
				73,
				{ '$or': bookingIds.map( id => ({ 5: id }) ) }
			)
			if (!bookings) return undefined;
			return bookings.filter( b => this.bookingIds.includes( b.values[5] ) ) as {values: bookingsFromBpium}[];
		})()
	}
}


// let t = new GetBooking(['INT00009016']).bookings
// .then(bookings => {
// 	console.log( bookings )
// })
