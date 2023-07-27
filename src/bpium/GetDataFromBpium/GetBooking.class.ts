import { bookingsFromBpium } from "../types";
import GetBpium from "../Connection/GetBpium.class";

export default class GetBooking {
	data: Array<string> 
	bookings: Promise<{values: bookingsFromBpium}[] | undefined>
	constructor( data: { catalogId: string, recordId: string }[] )
	constructor( data: Array<string> ) 
	constructor( data: any ){
		
		let field: string;
		let request: { '$or': any[] }
		if (typeof data[0] === 'string') {
			field = '5'
			request = { '$or': data.map( id => ({ [field]: id }) ) }
		} else {
			field = '91'
			request = { '$or': [{[field]: data}] }
		}

		this.data = data;
		this.bookings = (async () => {
			const connection = new GetBpium();
			const bookings = await connection.records(
				73,
				request
			)
			if (!bookings) return undefined;
			return typeof data[0] === 'string' ? bookings.filter( b => this.data.includes( b.values[field] ) ) as {values: bookingsFromBpium}[] : bookings as {values: bookingsFromBpium}[];
		})()
	}
}

// let t = new GetBooking([{recordId: '99', catalogId: '139'}]).bookings
// .then(bookings => {
// 	console.log( bookings )
// })
