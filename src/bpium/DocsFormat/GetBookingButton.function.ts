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
	}
}

export default function <T extends keyof typeof buttonGroup>(type: T, name: string) {
	return buttonGroup[type][name] ? buttonGroup[type][name] : name;
	}

