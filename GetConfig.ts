import dotenv from 'dotenv'
const configPath = process.env.CONFIG || './config.env'

console.log( configPath )

interface GetConfig{
	port: string
	protocol: string
	bpiumUrl: string
	receiver: string
	callbackParsed: string
	callbackTariff: string
	callbackNonValid: string
	apiPath: string
	login: string
	pass: string
}

class GetConfig{
	constructor(configPath) {
		dotenv.config({path: configPath})
		this.port = process.env.PORT
		this.protocol = process.env.PROTOCOL
		this.bpiumUrl = process.env.BPIUM_URL
		this.receiver = process.env.RECEIVER
		this.callbackParsed = process.env.CALLBACK_PARSED
		this.callbackTariff = process.env.CALLBACK_TARIFF
		this.callbackNonValid = process.env.CALLBACK_NON_VALID
		this.apiPath = process.env.API_PATH
		this.login = process.env.USERNAME
		this.pass = process.env.PASSWORD
	}
}

const bpiumConfig = new GetConfig(configPath)

export default bpiumConfig
