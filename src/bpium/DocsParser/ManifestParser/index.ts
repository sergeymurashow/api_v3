import _ from 'lodash'

import DocumentsParser from "../DocumentsParser.class"
import FindTableTitle from '../FindTableTitle.class'
import { Booking, Container, Headers } from '../../types'
import manifestGetVoyagePort, { ManifestGetVoyagePort } from '../functions/manifestGetVoyagePort'
import GetBookingFormManifest from './GetBookingFormManifest.class'
import GetContainerFromManifest from './GetContainerFromManifest.class'
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

		const collect: Booking[] = []
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
		let voyageNumber = getVoyageNumber(vesselVoyage)

		const getGrouppedData = (containers: Container[]) => {
			const mension = _.uniq(containers.map ( container => container.mension))
			const type = _.uniq(containers.map ( container => container.type))
			const owner = _.uniq(containers.map ( container => container.owner))
			const freight = _.uniq(containers.map ( container => container.freight))

			return {
				mension,
				type,
				owner,
				freight,
			}
		}

		const parsedManifest = this.splitByBooking()
		return parsedManifest.map( m => {
			Object.assign( m, { voyageNumber, from: loadingPort, to: portCountry }, getGrouppedData(m.containers) )
			return m
		})
			
	}
}
