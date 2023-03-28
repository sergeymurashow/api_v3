import _ from 'lodash'

import DocumentsParser from "../DocumentsParser.abstract"
import FindTableTitle from '../FindTableTitle.class'
import { Headers } from '../../types'
import manifestGetVoyagePort, { ManifestGetVoyagePort } from '../functions/manifestGetVoyagePort'
import GetBookingFormManifest from './GetBookingFormManifest'
import getContainerFromManifest from './getContainersFromManifest'
import getVoyageNumber from '../../utils/getVoyageNumber'


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
		.filter( fi => {
			return +fi.row < +this.startIndex - 1
		})
	}
	get parsed() {
		const {portCountry, loadingPort, vesselVoyage} = manifestGetVoyagePort( this.voyageInfo )
		let voyage = getVoyageNumber(vesselVoyage)

		let collect = {}
		let tmp: Headers.Manifest
		this.table.forEach(fo => {
			let chk = fo.BLNO && fo.BLNO.match(/(INT|INJIAN)/)
			if (chk) {
				tmp = fo
				let getBooking = new GetBookingFormManifest( fo )
				collect[tmp.BLNO] = getBooking.booking
			} else if (tmp && fo.CONTAINERNO) {
				if (fo.BLNO) collect[tmp.BLNO].hs = fo.BLNO

				collect[tmp.BLNO]['containers'].push(
					getContainerFromManifest(Object.assign({}, tmp, fo))
				)
			}
		})
		collect = _.toArray(collect)
		return _.sortBy(collect, 'bookingId')
	}
}

// let test = new ManifestParser('/Users/sergey.murashow/Codets/intecoJiangjie/api_v3/testData/Manifest_XINGANG_short.xls').parsed


