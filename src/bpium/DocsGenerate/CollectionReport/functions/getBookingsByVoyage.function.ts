import GetBooking from "../../../GetDataFromBpium/GetBooking.class";

export default async function getBookingsByVoyage(voyageLink: {
	catalogId: string,
	recordId: string,
}): Promise<any> {
	return new GetBooking([voyageLink]).bookings
}