import _ from 'lodash'

import DocumentsParser from "../DocumentsParser.class"
import FindTableTitle from '../FindTableTitle.class'
import { Booking, Container, Headers } from '../../types'
import manifestGetVoyagePort, { ManifestGetVoyagePort } from '../functions/manifestGetVoyagePort'
import GetBookingFormManifest from './GetBookingFormManifest.class'
import getContainerFromManifest from './GetContainerFromManifest.class'
import getVoyageNumber from '../../utils/getVoyageNumber'
import GetContainerFromManifest from './GetContainerFromManifest.class'


export default interface ManifestParser {
	table: Headers.Manifest[]
	startIndex: number
	voyageInfo: ManifestGetVoyagePort
}

export default class ManifestParser extends DocumentsParser {
	constructor(params) {
		super(params)
		const renamedTable = new FindTableTitle(this.bigSheet, 'manifest').getTable()
		this.table = renamedTable.table
		this.startIndex = renamedTable.startIndex
		this.voyageInfo = this.bigSheet
			.filter(fi => {
				return +fi.row < +this.startIndex - 1
			})
	}

	private splitByBooking() {
		let bookingTitles: Array<keyof Headers.ManifestBooking>
		let containerTitles: Array<keyof Headers.ManifestContainer>

		bookingTitles = [
			'BLNO',
			'CONSIGNEE',
			'GOODS',
			'GWEIGHT',
			'MARK',
			'NOTIFYPARTY',
			'PACKAGETYPE',
			'PKGS',
			'SHIPPER',
			'row',
		]

		containerTitles = [
			'CONTAINERNO',
			'CBM',
			'CONTAINEROWNER',
			'CONTAINERTAREWEIGHT',
			'FREIGHT',
			'VOLUME',
			'MENSION',
			'TYPE',
			'GWEIGHT_2',
			'PKGS_2',
			'REMARK',
			'SEAL',
			'row'
		]

		function getBooking(data: Headers.Manifest): Booking {
			const result: Headers.ManifestBooking = {}
			bookingTitles.forEach(fo => result[fo] = data[fo])
			return new GetBookingFormManifest(result).info
		}

		function getContainer(data: Headers.Manifest): Container {
			const result: Headers.ManifestContainer = {}
			containerTitles.forEach(fo => result[fo] = data[fo])
			return new GetContainerFromManifest(result).info
		}

		const collect = []
		let addrInCollectArray: number
		this.table.forEach(fo => {
			if (fo.BLNO) addrInCollectArray = collect.push(
				Object.assign({}, getBooking(fo), { containers: [] })
			) - 1
			if (fo.CONTAINERNO) collect[addrInCollectArray].containers.push(getContainer(fo))
		})

		return collect
	}

	get parsed() {
		const { portCountry, loadingPort, vesselVoyage } = manifestGetVoyagePort(this.voyageInfo)
		let voyage = getVoyageNumber(vesselVoyage)

		const getMensionAndType = (containers: Container[]) => {
			let mensions = []
			let types = []
			containers.forEach(fo => {
				mensions.push(fo.mension)
				types.push(fo.type)
			})

			return {
				mension: _.uniq(mensions),
				type: _.uniq(types)
			}
		}

		return this.splitByBooking()
			

		// let collect: Booking = {}
		// let tmp: Headers.Manifest
		// this.table.forEach(fo => {
		// 	let chk = fo.BLNO && fo.BLNO.match(/(INT|INJIAN)/)
		// 	if (chk) {
		// 		tmp = fo
		// 		let getBooking = new GetBookingFormManifest(fo)
		// 		collect[tmp.BLNO] = Object.assign({}, getBooking.booking, { voyage })
		// 	} else if (tmp && fo.CONTAINERNO) {
		// 		if (fo.BLNO) collect[tmp.BLNO].hs = fo.BLNO

		// 		collect[tmp.BLNO]['containers'].push(
		// 			getContainerFromManifest(Object.assign({}, tmp, fo))
		// 		)
		// 	}
		// })

		// const response = _.toArray(collect)

		// return _.sortBy(response, 'bookingId')
	}
}

let test = new ManifestParser('/Users/sergey.murashow/Codets/intecoJiangjie/api_v3/testData/Manifest_XINGANG_short.xls').parsed


