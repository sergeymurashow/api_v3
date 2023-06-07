import createCatalogs from "../bpium/utils/createCatalogs";

class Logger {
	log
	constructor() {
		createCatalogs('Log')
		this.log = (message) => {
			console.log(message);
		};
	}

}