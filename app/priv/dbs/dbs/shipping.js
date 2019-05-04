const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Shipping',
		name: 'shipping',
		properties: {
			shipping_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			shipping_type: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			shipping_cost: {
				type: Sequelize.NUMERIC(10, 2),
				allowNull: false
			},
			shipping_region_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_shipping_shipping_region_id',
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
