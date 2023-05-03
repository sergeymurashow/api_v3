import { Booking, bookingsFromBpium } from "../types";
import GetBpium from "../Connection/GetBpium.class";
import getBookingButton from "../DocsFormat/GetBookingButton.function";

export default class GetPoints {
	pointsNames: Array<string>
	points
	voyage: string
	constructor(voyage: string, pointsNames: Array<string>) {
		this.voyage = voyage;
		this.pointsNames = pointsNames;
		this.points = (async () => {
			const connection = new GetBpium();
			const points = await connection.records(
				140,
				filterParams(this.voyage, this.pointsNames)
			)
			if (!points) return undefined;
			return points
		})()
	}
}


function filterParams( voyage: string, pointsNames: Array<string> ) {
	return {
		"$and": [
			{ 11: voyage },
			{
				"$or": pointsNames.map( name => ({ 11: name }) )
			}]
	}
}

// new GetPoints('I17N55', ['VOSTOCHNY', 'TAICANG', 'RIZHAO', 'XINGANG'])