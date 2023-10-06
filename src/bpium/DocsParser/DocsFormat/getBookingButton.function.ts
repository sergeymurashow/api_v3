const buttonGroup = {
	'mension': {
		'20': 1,
		'40': 2,
	},
	'type': {
		'DC': 1,
		'TC': 2,
		'RF': 3,
		'HQ': 4,
		'HC': 5,
		'GP': 7,
		'TK': 8,
	},
	'owner': {
		'SOC': 1,
		'COC': 2,
	},
	'freightTerm': {
		'prepaid': 1,
		'collect': 2,
		'PREPAID': 1,
		'COLLECT': 2,
		'FREIGHT PREPAID': 1,
		'FREIGHT COLLECT': 2,
	},
	'direction': {
		'import': 1,
		'export': 2,
	}
}

// export function <T extends keyof typeof buttonGroup>(type: T, name: string) {
// 	return buttonGroup[type][name] ? buttonGroup[type][name] : undefined;
// }


export default function getBookingButton<T extends keyof typeof buttonGroup>(type: T, name: number): string | undefined
export default function getBookingButton<T extends keyof typeof buttonGroup>(type: T, name: string): number | undefined
export default function getBookingButton<T extends keyof typeof buttonGroup>(type: T, name: string | number) {
	if (typeof name === 'string') {
		return buttonGroup[type][name] ? buttonGroup[type][name] : undefined;
	}
	else if (typeof name === 'number'){
		const block = buttonGroup[type]
		const reverseBlock = Object.keys(block).reduce((acc, key) => {
			acc[block[key]] = key

			return acc
		}, {} as { [key: number]: string })

		return reverseBlock[name] ? reverseBlock[name] : undefined;
}
		return buttonGroup[type][name] ? buttonGroup[type][name] : undefined;
}