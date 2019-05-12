module.exports = {
	Attribute: require('./attribute'),
	Auth: require('./auth'),
	Category: require('./category'),
	Department: require('./department'),
	Orders: require('./orders'),
	Pagination: require('./pagination'),
	Product: require('./product'),
	Shipping: require('./shipping'),
	ShoppingCart: require('./shopping-cart'),
	Tax: require('./tax'),
	User: require('./user'),
	Default: {
		Unhandled: {
			code: '0x99999',
			message: 'Unhandled error "${err}"'
		}
	}
};
