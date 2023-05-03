import PostBpium from "../Connection/PostBpium.class"

type VoyageNumber = {
	id: string | number
	catalogId: string | number
	[key: string | number]: any
}

export default class PostBooking { 
	newBooking: {id: string | number, catalogId: string | number}[]

	async addBooking( data ) {
		const connection = new PostBpium()
		const newBooking = await connection.record( 73, data )
		if (!newBooking) return undefined;
		return newBooking
	}
}
