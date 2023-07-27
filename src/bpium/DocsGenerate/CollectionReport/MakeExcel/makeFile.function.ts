import XLSX from 'xlsx';
import path from 'path';
import _ from 'lodash';
import createCatalogs from '../../../utils/createCatalogs';

const dir = path.join(__dirname, 'test.xlsx');



function convertToRowsForExcel(booking: any) {
	const { 
		bookingId,
		goods,
		shipper,
		consignee,
		notifyParty,
		containers
	} = booking
	const rows = [
		...containers.map((container: any) => (
			delete container.bookingId,
			{
			bookingId: '',
			goods: '',
			shipper: '',
			consignee: '',
			notifyParty: '',
			...container,
			
		})),
	]

	Object.assign(rows[0], {
		bookingId,
		goods,
		shipper,
		consignee,
		notifyParty,
	})

	return rows.concat([{}])
}

type Tws_header = {
	portFrom: string,
	portTo: string,
	vessel: string,
	voyage: string,
	countryFrom: string,
	countryTo: string,
}

export default function makeFile( ws_data_input, ws_header_input: Tws_header ) {

	const wb = XLSX.utils.book_new();
	if (!wb.Props) wb.Props = {};
	wb.Props.Title = "SheetJS Generated File";
	wb.Props.Author = "BPium";
	wb.Props.CreatedDate = new Date();
	wb.SheetNames.push("Sheet1");

	const { portFrom, portTo, countryFrom, countryTo, vessel, voyage } = ws_header_input

	const fileName = `Bills of Landing ${voyage}_${portFrom}.xlsx`
	createCatalogs('tmp');
	const saveDir = path.resolve('tmp',fileName);

	const ws_data = (() => {
		return _.flatten(ws_data_input.map( m => convertToRowsForExcel(m) ))
	})()


	const ws_header = [ [`${vessel}, ${voyage}`], [`From: ${portFrom}, ${countryFrom}`, `To: ${portTo}, ${countryTo}`] ]
	const ws = XLSX.utils.json_to_sheet(ws_data, {origin: 'A3'});
	XLSX.utils.sheet_add_aoa(ws, ws_header, {origin: 'A1'})
	XLSX.utils.format_cell(ws['A1'], 's', {font: {sz: 14, bold: true}})

	wb.Sheets["Sheet1"] = addCalculation(ws);

	XLSX.writeFile(wb, saveDir);
	return saveDir
}

function addCalculation( ws ) {
	for (const i in ws) {
		const parsedCell = i.match(/(?<col>[A-Z]+)(?<row>[0-9]+)/)
		const row = parsedCell && parsedCell.groups ? parsedCell.groups.row : ''
	
		const checks = /!/.test(i) || +row <= 3
	
		if (!checks) {
			if (/[FG]/.test(i)) ws[i].t = 'n';
			if (/I/.test(i)) {
				ws[i].f = `SUM(F${row};-G${row})`
			} else {
				ws[i].t = 'w'
			}
		}
	}
	return ws
}





