import PostBpium from "../Connection/PostBpium.class"
import { containerFieldFromBpium } from "../types";

export default class PostContainer { 
	newContainer: {id: string | number, catalogId: string | number}[]

	async addContainer( container ): Promise<any> {
		const connection = new PostBpium()
		const newContainer = await connection.record( 108, container)
		if (!newContainer) return undefined;
		return  {recordId: newContainer.id , catalogId: 108}
	}
}
