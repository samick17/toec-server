const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Customer',
		name: 'customer',
		properties: {
			customer_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			email: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			password: {
				type: Sequelize.STRING(50),
				allowNull: false
			},
			credit_card: {
				type: Sequelize.TEXT
			},
			address_1: {
				type: Sequelize.STRING(100)
			},
			address_2: {
				type: Sequelize.STRING(100)
			},
			city: {
				type: Sequelize.STRING(100)
			},
			region: {
				type: Sequelize.STRING(100)
			},
			postal_code: {
				type: Sequelize.STRING(100)
			},
			country: {
				type: Sequelize.STRING(100)
			},
			shipping_region_id: {
				type: Sequelize.INTEGER,
				allowNull: false,
				defaultValue: '1'
			},
			day_phone: {
				type: Sequelize.STRING(100)
			},
			eve_phone: {
				type: Sequelize.STRING(100)
			},
			mob_phone: {
				type: Sequelize.STRING(100)
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_customer_email',
				fields: ['email'],
				unique: true
			},
			{
				name: 'idx_customer_shipping_region_id',
				fields: ['shipping_region_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
