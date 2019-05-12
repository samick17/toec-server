module.exports = {
	InvalidEmailOrPW: {
		code: 'USR_01',
		message: 'Invalid email or password.'
	},
	FieldsRequired: {
		code: 'USR_02',
		message: 'Fields "${fields}" is required'
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
		message: 'Email "${email}" doesn\' exists.'
	},
	InvalidPhoneNumber: {
		code: 'USR_06',
		message: 'This is an invalid phone number. Please use correct one.'
	},
	FieldTooLong: {
		code: 'USR_07',
		message: 'The field "${field}" is too long.'
	},
	InvalidCreditCard: {
		code: 'USR_08',
		message: 'This is an invalid Credit Card: "${cardId}".'
	},
	InvalidShippingRegionID: {
		code: 'USR_09',
		message: 'This is an invalid Shipping Region ID: "${id}"'
	},
	InvalidToken: {
		code: 'USR_10',
		message: 'Invalid token: "${token}"'
	},
	TokenExpired: {
		code: 'USR_11',
		message: 'Token is expired. Please login again."'
	},
	InvalidUserID: {
		code: 'USR_12',
		message: 'Invalid userId: "${uid}"'
	},
	InvalidName: {
		code: 'USR_13',
		message: 'Invalid name: "${name}"'
	},
	NameNotString: {
		code: 'USR_14',
		message: 'User name should be a string.'
	},
	NameOutOfRange: {
		code: 'USR_15',
		message: 'Length of user name should be 1 to 50.'
	},
	PasswordNotString: {
		code: 'USR_16',
		message: 'Password should be a string.'
	}
};
