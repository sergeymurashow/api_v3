import PostBpium from "../Connection/PostBpium.class"

type VoyageNumber = {
	id: string | number
	catalogId: string | number
	[key: string | number]: any
}

export default class PostPoint { 
	newPoint: {id: string | number, catalogId: string | number}[]

	async addPoint( voyageNumber: VoyageNumber, pointName: string ) {
		const connection = new PostBpium()
		const newPoint = await connection.record( 114, {
			5: voyageNumber,
			11: pointName,
			12: ['1']
		})
		if (!newPoint) return undefined;
		return newPoint
	}
}
