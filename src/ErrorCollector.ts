type Errlog = {
	[key: string | number ]: any
}

export class ErrorsCollector extends Error{
	errCollection: Array<string>
	errLog: ( description: Errlog  ) => void
	getErrors: () => Array<string>
	constructor( message: string ) {
		super( message )
		this.errCollection = []
		this.errLog = ( data: Errlog ) => {
			if( !this.errCollection.length ) this.errCollection.push( message )
			const dataString = JSON.stringify(data.message, null, 1 )
			this.errCollection.push( dataString )
			console.log( data )
		}
		this.getErrors = () => {
			return this.errCollection
		}
	}
}




