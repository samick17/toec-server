const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Orders',
		name: 'orders',
		properties: {
			order_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			total_amount: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: '0.00'
			},
			created_on: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW
			},
			shipped_on: {
				type: Sequelize.DATE,
			},
			status: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: '0'
			},
			comments: {
				type: Sequelize.STRING(255)
			},
			customer_id: {
				type: Sequelize.INTEGER
			},
			auth_code: {
				type: Sequelize.STRING(50)
			},
			reference: {
				type: Sequelize.STRING(50)
			},
			shipping_id: {
				type: Sequelize.INTEGER
			},
			tax_id: {
				type: Sequelize.INTEGER
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_orders_customer_id',
				fields: ['customer_id']
			},
			{
				name: 'idx_orders_shipping_id',
				fields: ['shipping_id']
			},
			{
				name: 'idx_orders_tax_id',
				fields: ['tax_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
