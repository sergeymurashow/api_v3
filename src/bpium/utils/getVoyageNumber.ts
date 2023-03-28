import Counter from "./counter"

export default function getVoyageNumber (voyageNumberString: string): string {
	let regVoyage = /([iI]\d+[a-zA-Z0-9]+|INT\d*\w*)/
	let regNumber = /(\d+)/
	let voyageNum
	try {
		voyageNum = voyageNumberString.match(regVoyage)[0]
	} catch (e) {
		throw `Couldn't parse Voyage number: ${voyageNumberString}`
	}
	let newVoyageNum = voyageNum.replace(regNumber, (match, p1) => {
		const templater = new Counter(2, p1)
		return templater.getNumber()
	})
	return newVoyageNum
}