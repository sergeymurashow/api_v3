import getBookingButton from "../../../DocsFormat/getBookingButton.function";
import { Container, containerFieldFromBpium } from "../../../types";
import { getRecordTitle, formatDate, getRecordValues } from "../../../utils/bpiumDataUtils.function";

type PrettyContainer = (Container & { 
	bookingId: string, 
	contract: string, 
	payer: string, 
	applicationDate: string, 
	rate: string | number,
	price: string | number,
	discount: string | number,
	discountReason: string, })

export default function prettyContainer(container: containerFieldFromBpium): PrettyContainer {

	try {
		const result: PrettyContainer = {
			'bookingId': container['21'].length ? getRecordTitle(container['21'])[0] : '',
			'price': '',
			'discount': '',
			'discountReason': '',
			'rate': '',
			'number': container['2'],
			'freight': getBookingButton('freightTerm', +container['34'][0]),
			'owner': getBookingButton('owner', +container['17'][0]),
			'mension': getBookingButton('mension', +container['15'][0]),
			'payer': container['20'] && container['20'].length ? getRecordTitle(container['20'])[0] : 'EMPTY!!!',
			'contract': container['22'] && container['22'].length ? getRecordTitle(getRecordValues(14, container['22']))[0] : 'EMPTY!!!',
			'applicationDate': formatDate(container['24']),
		}

		return result
	} catch (e) {
		console.log(container)
		throw e
	}
}