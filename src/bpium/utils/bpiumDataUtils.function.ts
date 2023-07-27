import _ from "lodash"
import { recordValues } from "../types"
import dayjs from "dayjs"

export function getRecordTitle( fieldData: recordValues[] ): string[] {
	if( !fieldData || !fieldData.length ) return []
	fieldData = _.flatten(fieldData)
	return fieldData.map( (field: recordValues) => field.recordTitle )
}

export function getRecordValues( fieldId: string | number, fieldData: recordValues[] ) { 
	return [].concat(fieldData.map( (field: recordValues) => field.recordValues[fieldId] ))
}

export function formatDate( date: string ): string {
	const dateObj = dayjs( date )
	return dateObj.format( 'DD.MM.YYYY' )
}

