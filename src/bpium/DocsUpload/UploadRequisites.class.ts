import PostRequisites from "../PostDataToBpium/PostRequisites.class";

import clearRequest from "../utils/clearRequest.function";

type DataTemplate = {
	[key: number | string]: any
}

type InputData = {
	data: DataTemplate
	method: 'post' | 'patch'
	recordId?: string | number
}

export default class DocsUpload {
	requisites
	constructor(requisites) {
		this.requisites = requisites
	}
	async post(data: InputData = this.requisites) {
		const post = new PostRequisites()
		try {
			const newRequisites = await post.addRequisites(clearRequest(data.data))
			.then(res => {
				// console.log(res)
				return res
			})
			.catch(e => {
				console.log(e)
			})
			return [newRequisites]
		} catch (e) {
			console.log(e)
		}
	}

	async patch(data: InputData) {
		throw new Error('Method not implemented.');
	}
}
