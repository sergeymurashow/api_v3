import BP from 'bp-api'
import dotenv from 'dotenv'
import path from 'path'

const bpConfig = process.env.BP_CONFIG || dotenv.config({ path: path.resolve(__dirname, '../../../config/config.env') }).parsed

class BPConnect{
	private static instance: BP
	private constructor(){}
	static getInstance(): BP{
		if(!BPConnect.instance){
			this.instance = new BP(bpConfig)
		}
		return this.instance
	}
}

export default BPConnect.getInstance()