import fs from "fs";
import path from 'path'
import _ from 'lodash'

import DocumentsParser from "../DocumentsParser.class";
import { BigSheet } from "../DocumentsParser.class";
import UploadClient from "../../DocsUpload/UploadClient.class";
import UploadRequisites from "../../DocsUpload/UploadRequisites.class";
import UploadContract from "../../DocsUpload/UploadContract.class";
import prettier from "./contractsPrettier.function";
import dayjs from "dayjs";
import { saveFile } from "../../utils/saveFile";

const testData = path.resolve(__dirname, '../../../../testData/journal copy.xlsx').toString()

const contractTypes = new Map()
contractTypes.set('оказания транспортно-экспедиционных услуг при международной перевозке', [{ catalogId: 136, recordId: 7 }])
contractTypes.set('на организацию международной морской перевозки грузов', [{ catalogId: 136, recordId: 6 }])
contractTypes.set('не берем номер!!!', [{ catalogId: 136, recordId: 8 }])

export default interface ContractParser {
	fixedSheet: BigSheet[]
	prettiedSheet: any[]
	tmpClients: Map<string, UploadClient>
	tmpRequisites: Map<string, UploadRequisites>
}

export default class ContractParser extends DocumentsParser {
	constructor(params) {
		super(params)
		this.tmpClients = new Map()
		this.tmpRequisites = new Map()
	}

	private addCells() {
		const newCells = []
		this.bigSheet.forEach((m, i, a) => {
			let { row, col, value, merge, name } = m

			if (merge) {
				newCells.push({ row: merge.to, col, value, merge: undefined, name })
			}
		})

		this.fixedSheet = this.bigSheet.concat(newCells)
		const sortedSheet = _.sortBy(this.fixedSheet, o => {
			return +o.row
		})
		this.prettiedSheet = prettier(sortedSheet)
		return this.prettiedSheet
	}

	private async makeClient(client) {
		const clientCheck = this.tmpClients.get(client)
		let clientLink

		if (clientCheck) {
			clientLink = clientCheck
		} else {
			clientLink = await (new UploadClient({ data: { 5: client } })).post()
			this.tmpClients.set(client, clientLink)
		}

		return clientLink
	}

	private async makeRequisites(requisites, clientLink) {
		let requisitesLink
		const requisitesCheck = this.tmpRequisites.get(requisites)

		if (requisitesCheck) {
			requisitesLink = requisitesCheck
		} else {
			requisitesLink = await (new UploadRequisites({ data: { 3: clientLink, 20: requisites } })).post()
			this.tmpRequisites.set(requisites, requisitesLink)
		}
		return requisitesLink
	}

	async makeContract(contract) {

		// console.log( JSON.stringify(contract, null, 1) )

		const { number, fromDate, contractType, requisites, client, alias } = contract

		const clientLink = await this.makeClient(client)
		await this.makeRequisites(requisites, clientLink)

		return await (new UploadContract({
			data:
			{
				2: `${number} от ${fromDate}`,
				3: clientLink,
				8: fromDate.split('T')[0],
				13: alias,
				14: number,
				15: contractTypes.get(contractType),
			}
		})).post()


	}

	async parsed() {
		this.addCells()
		// saveFile('contracts.json', JSON.stringify(this.prettiedSheet, null, 1))
		for (let contract of this.prettiedSheet) {
			await this.makeContract(contract)
		}
	}
}