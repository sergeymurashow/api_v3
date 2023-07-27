import { Booking, bookingFromBpium } from "../../../types";
import { getRecordTitle, getRecordValues } from "../../../utils/bpiumDataUtils.function";
import getBookingButton from "../../../DocsFormat/getBookingButton.function";

type PrettyBooking = Booking & {
	vessel: string,
	emptyDropLocation: string,
	countryFrom: string,
	countryTo: string,
	owner: string,
}


export default function prettyBooking(booking: bookingFromBpium): PrettyBooking {

	const routeCountries = ((data = booking['165']) => {
		const stringDirection = getBookingButton('direction', +data[0])
		switch (stringDirection) {
			case 'import': return { from: 'China', to: 'Russia' };
			case 'export': return { from: 'Russia', to: 'China' };
		}
	})()

	try {
		const result: PrettyBooking = {
			bookingId: booking['5'],
			goods: booking['181'],
			shipper: booking['108'],
			consignee: booking['109'],
			notifyParty: booking['110'],
			from: getRecordTitle(getRecordValues(2, booking['163']))[0],
			to: getRecordTitle(getRecordValues(2, booking['164']))[0],
			voyageNumber: getRecordTitle(booking['91'])[0],
			vessel: getRecordTitle(booking['91'][0].recordValues['7'])[0],
			countryFrom: routeCountries.from,
			countryTo: routeCountries.to,
			emptyDropLocation: getRecordTitle(booking['165'])[0],
			owner: getBookingButton('owner', +booking['63'][0]) as string & string[],
		}
		return result
	} catch (e) {
		console.log(booking)
		throw e
	}

}
