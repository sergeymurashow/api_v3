import PostBpium from "../Connection/PostBpium.class"

export default class PostRequisites { 
	newRequisites: {id: string | number, catalogId: string | number}[]

	async addRequisites( requisites ): Promise<any> {
		const connection = new PostBpium()
		const newRequisites = await connection.record( 115, requisites)
		if (!newRequisites) return undefined;
		return  {recordId: newRequisites.id , catalogId: 115}
	}
}
