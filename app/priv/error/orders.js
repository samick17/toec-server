module.exports = {
	IDNotNumber: {
		code: 'ORD_01',
		message: 'Orders ID should be a number'
	},
	IDNotFound: {
		code: 'ORD_02',
		message: 'Invalid orders ID "${id}"'
	},
	InvalidOrderFormat: {
		code: 'ORD_03',
		message: 'The order is not match "field,(DESC|ASC)"'
	}
};
