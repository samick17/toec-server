module.exports = {
	IDNotNumber: {
		code: 'CAT_01',
		message: 'Category ID should be a number'
	},
	IDNotFound: {
		code: 'CAT_02',
		message: 'Invalid category ID "${id}"'
	},
	InvalidProductID: {
		code: 'CAT_03',
		message: 'Cannot get categories by product: "${productId}"'
	},
	InvalidDepartmentID: {
		code: 'CAT_04',
		message: 'Cannot get categories by department: "${departmentId}"'
	},
	PageNotNumber: {
		code: 'CAT_05',
		message: 'The field "page" should be a number'
	},
	PageOutOfRange: {
		code: 'CAT_06',
		message: 'The field "page" should greater than 1'
	},
	LimitNotNumber: {
		code: 'CAT_07',
		message: 'The field "limit" should be a number'
	},
	LimitOutOfRange: {
		code: 'CAT_08',
		message: 'The field "limit" should greater than 1'
	}
};
