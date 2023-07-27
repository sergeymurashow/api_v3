import XLSX from 'xlsx';
import path from 'path';
import { Booking, Container } from '../../../types';
import makeFile from './makeFile.function';

export type TbookingHeader = {
	portFrom: string,
	portTo: string,
	vessel: string,
	voyage: string,
	countryFrom: string,
	countryTo: string,
}

export default class MakeExcel {
	private _bookingHeader: TbookingHeader
	private _wb: XLSX.WorkBook
	private _ws: XLSX.WorkSheet
	private _ws_data: any[] = []

	constructor(bookingHeader: TbookingHeader,) {
		this._bookingHeader = bookingHeader
		this._wb = XLSX.utils.book_new();
		if (!this._wb.Props) this._wb.Props = {};
		this._wb.Props.Title = `Bills of Landing ${this._bookingHeader.voyage}`;
		this._wb.Props.Author = "Manager";
		this._wb.Props.CreatedDate = new Date();
		this._wb.SheetNames.push("Bills of Landing");
	}
	setBooking(mergedBooking: Booking & Container[],) {
		const { bookingId,
			goods,
			shipper,
			consignee,
			notifyParty,
			containers
		} = mergedBooking

		this._ws_data.push({
			bookingId,
			goods,
			shipper,
			consignee,
			notifyParty,
			containers,
		})
	}

	makeFile(): ReturnType<typeof makeFile> {
		
		return makeFile(this._ws_data, this._bookingHeader)
		
	}
}