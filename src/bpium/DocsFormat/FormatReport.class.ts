import { Booking } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import getBookingButton from "./GetBookingButton.function";

export default class FormatReport {
	bookings: { [key: string]: any };
	cache: { [key: string]: any };
	connection: GetBpium;
	constructor(booking: Booking[]) {
		this.bookings = booking;
		this.connection = new GetBpium();
	}

	async result(bookings = this.bookings) {
		
	}

}