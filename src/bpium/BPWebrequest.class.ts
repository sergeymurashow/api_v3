import dotenv, { DotenvParseOutput } from 'dotenv'
import path from 'path'

type BpConfig = {
	PORT: string
	PROTOCOL: string
	BPIUM_URL: string
	RECEIVER: string
	CALLBACK_PARSED: string
	CALLBACK_TARIFF: string
	CALLBACK_NON_VALID: string
	USERNAME: string
	PASSWORD: string
	API_PATH: string
}


const bpConfig: BpConfig =  dotenv.config({ path: path.resolve(__dirname, '../../../config/config.env') }).parsed as BpConfig

class BPWebrequest {
	private static instance: BPWebrequest
	private path: string
	baseUrl: string
	instance: BPWebrequest
	constructor(path) {
		this.path = `${bpConfig.RECEIVER}${path}`
		this.baseUrl = `${bpConfig.PROTOCOL}${bpConfig.BPIUM_URL}${this.path}}`

	}
	getInstance(): BPWebrequest {
		if (!BPWebrequest.instance) {
			this.instance = new BPWebrequest(this.path)
		}
		return this.instance
	}

	async makeRequest() {
		
	}
}

let t = new BPWebrequest('test').getInstance()
