const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'OrderDetail',
		name: 'order_detail',
		properties: {
			item_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			attributes: {
				type: Sequelize.STRING(1000),
				allowNull: false
			},
			product_name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			unit_cost: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_order_detail_order_id',
				fields: ['order_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
