module.exports = {
	InvalidEmailOrPW: {
		code: 'USR_01',
		message: 'Invalid email or password.'
	},
	FieldsRequired: {
		code: 'USR_02',
		message: ''
	},
	InvalidEmailFormat: {
		code: 'USR_03',
		message: 'Email "${email}" format error.'
	},
	DuplicatedEmail: {
		code: 'USR_04',
		message: 'Email "${email}" has been registered by another user. Please use another one instead.'
	},
	EmailNotExists: {
		code: 'USR_05',
		message: 'Email "${email}" not found!'
	},
	InvalidPhoneNumber: {
		code: 'USR_06',
		message: 'Invalid phone number.'
	},
	FieldTooLong: {
		code: 'USR_07',
		message: 'Field "${field}" is too long.'
	},
	InvalidCreditCard: {
		code: 'USR_08',
		message: 'Invalid credit card number "${cardId}".'
	},
	InvalidShippingRegionID: {
		code: 'USR_09',
		message: 'Invalid shipping region id "${id}"'
	},
	InvalidToken: {
		code: 'USR_10',
		message: 'Invalid token: "${token}"'
	},
	InvalidUserID: {
		code: 'USR_11',
		message: 'Invalid userId: "${userId}"'
	}
};
