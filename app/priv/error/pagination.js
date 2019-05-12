module.exports = {
	InvalidOrderFormat: {
		code: 'PAG_01',
		message: 'The order is not matched "field(DESC|ASC)"'
	},
	SortingNotAllowed: {
		code: 'PAG_02',
		message: 'The field of orders is not allow sorting'
	},
	PageNotNumber: {
		code: 'PAG_03',
		message: 'The field "page" should be a number'
	},
	PageOutOfRange: {
		code: 'PAG_04',
		message: 'The field "page" should greater than 1'
	},
	LimitNotNumber: {
		code: 'PAG_05',
		message: 'The field "limit" should be a number'
	},
	LimitOutOfRange: {
		code: 'PAG_06',
		message: 'The field "limit" should greater than 1'
	}
};
