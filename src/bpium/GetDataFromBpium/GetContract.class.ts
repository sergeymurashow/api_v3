import { bookingsFromBpium } from "../types";
import GetBpium from "../Connection/GetBpium.class";

export default class GetContract {
	contractsNames: Array<string>
	contracts: Promise<{ values: bookingsFromBpium }[]>
	constructor(contractsNames: Array<string>) {
		this.contractsNames = contractsNames;
		this.contracts = (async () => {
			const connection = new GetBpium();
			const bookings = await connection.records(
				114,
				{ '$or': contractsNames.map(c => ({ 14: c })) }
			)
			if (!bookings) return undefined;
			return bookings
		})()
	}
}


// let t = new GetBooking(['INT00009016']).bookings
// .then(bookings => {
// 	console.log( bookings )
// })
