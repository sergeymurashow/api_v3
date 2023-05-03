export type filterParams = {[key: string]: string | filterParams | Array<filterParams>}

export default class SetFilter{
	private filterTmp = {}

	set filter( searchParams: filterParams ) { 
		Object.assign( this.filterTmp, searchParams )
	}

	get filter(): filterParams {
		return prepareFilter( this.filterTmp )
	}

}

function prepareFilter(filter: filterParams) {
	return  {"filters":JSON.stringify(filter)
	.replace( /{\s*(\d+):/, '"$1"')
	.replace(/(\n+|\t+)/, '')
	.replace(/(')/, '"')
}
}