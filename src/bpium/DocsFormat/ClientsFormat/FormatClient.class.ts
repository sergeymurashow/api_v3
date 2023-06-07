import { Method } from "..";


export default class FormatClient {
	clients
	constructor(clients ) {
		this.clients = clients;
	}

	async result(clients = this.clients) {


		const formattedClients = clients.map((client, i, a) => {

			return {
				data: {
					5: clients
				},
				method: 'post' as Method,
				recordId: undefined
			}
		})

		return formattedClients

	}

}