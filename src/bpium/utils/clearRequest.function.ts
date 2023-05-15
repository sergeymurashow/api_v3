export default function clearRequest (request) {
	for( let i in request ) {
		if (request[i] === undefined) delete request[i]
	}
	return request
}