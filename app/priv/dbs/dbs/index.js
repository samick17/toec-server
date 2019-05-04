const Sequelize = require('sequelize');
const DepartmentDef = require('./department');
const CategoryDef = require('./category');
const ProductDef = require('./product');
const ProductCategoryDef = require('./product-category');
const AttributeDef = require('./attribute');
const AttributeValueDef = require('./attribute-value');
const ProductAttributeDef = require('./product-attribute');
const ShoppingCartDef = require('./shopping-cart');
const OrdersDef = require('./orders');
const OrderDetailDef = require('./order-detail');
const ShippingRegionDef = require('./shipping-region');
const CustomerDef = require('./customer');
const ShippingDef = require('./shipping');
const TaxDef = require('./tax');
const AuditDef = require('./audit');
const ReviewDef = require('./review');

async function initialize(seq, model) {
	let opts = Object.assign({
		tableName: model.name
	}, model.options);
	let Model = seq.define(model.modelName, model.properties, opts);
	await Model.sync();
}

async function defineAll(seq) {
	await Promise.all([
	DepartmentDef,
	CategoryDef,
	ProductDef,
	ProductCategoryDef,
	AttributeDef,
	AttributeValueDef,
	ProductAttributeDef,
	ShoppingCartDef,
	OrdersDef,
	OrderDetailDef,
	ShippingRegionDef,
	CustomerDef,
	ShippingDef,
	TaxDef,
	AuditDef,
	ReviewDef
	].map(async model => {
		let modelData = model.init();
		await initialize(seq, modelData);		
	}));
	const {
		Product,
		Department,
		Category,
		Attribute,
		AttributeValue,
		ProductCategory,
		ProductAttribute,
		ShoppingCart,
		Orders,
		OrderDetail,
		Review,
		Customer
	} = seq.models;
	// Product - Category
	Product.belongsToMany(Category, {through: ProductCategory, foreignKey: 'product_id'});
	Category.belongsToMany(Product, {through: ProductCategory, foreignKey: 'category_id'});
	// Category - Department
	Category.belongsTo(Department, {foreignKey: 'department_id'});
	// Product - Attribute
	Product.belongsToMany(AttributeValue, {through: ProductAttribute, foreignKey: 'product_id'});
	AttributeValue.belongsToMany(Product, {through: ProductAttribute, foreignKey: 'attribute_value_id'});
	AttributeValue.belongsTo(Attribute, {foreignKey: 'attribute_id'});
	// Customer - Product - Review
	Product.hasMany(Review, {foreignKey: 'product_id'});
	Review.belongsTo(Customer, {foreignKey: 'customer_id'});
	// ShoppingCart - Product
	ShoppingCart.belongsTo(Product, {foreignKey: 'product_id'});
	// Orders - OrderDetail
	Orders.hasMany(OrderDetail, {foreignKey: 'order_id'});
	OrderDetail.belongsTo(Orders, {foreignKey: 'order_id'});
}

async function init({id, pw, host, port, db}) {
	let uri = `mysql://${id}:${pw}@${host}:${port}/${db}`;
	let seq = new Sequelize(uri, {
		define: {
			timestamps: false
		},
		logging: false
	});
	await defineAll(seq);
	return seq;
}

module.exports = {
	init: init
};
