const AttributeAPI = require('./attribute');
const CategoryAPI = require('./category');
const CustomerAPI = require('./customer');
const DepartmentAPI = require('./department');
const OrdersAPI = require('./orders');
const ProductAPI = require('./product');
const ShippingAPI = require('./shipping');
const ShoppingCartAPI = require('./shopping-cart');
const TaxAPI = require('./tax');

function init(seq, APIs) {
	AttributeAPI.init(seq, APIs);
	CategoryAPI.init(seq, APIs);
	CustomerAPI.init(seq, APIs);
	DepartmentAPI.init(seq, APIs);
	OrdersAPI.init(seq, APIs);
	ProductAPI.init(seq, APIs);
	ShippingAPI.init(seq, APIs);
	ShoppingCartAPI.init(seq, APIs);
	TaxAPI.init(seq, APIs);
}

module.exports = {
	init: init
};
