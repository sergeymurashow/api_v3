import { Booking, Container } from '../../../types'


export default function mergeData( prettiedBookings: Booking[], prettiedContainers: Container[] ) {
	return prettiedBookings.map( (booking: any) => {
		const containers = prettiedContainers.filter( (container: any) => container.bookingId === booking.bookingId )
		.map( (container: any) => {
			container.owner = booking.owner // TODO: Fix bug in import files and remove this line
			return container
		} )

		return {
			...booking,
			containers,
		}
	} )
}