import PostContract from "../PostDataToBpium/PostContract.class";

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
	contract
	constructor(contract) {
		this.contract = contract
	}
	async post(data: InputData = this.contract) {
		const post = new PostContract()
		try {
			return [await post.addContract(clearRequest(data.data))]
		} catch (e) {
			console.log(e)
		}
	}

	async patch(data: InputData) {
		throw new Error('Method not implemented.');
	}
}
