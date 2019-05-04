const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'ShoppingCart',
		name: 'shopping_cart',
		properties: {
			item_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			cart_id: {
				type: Sequelize.CHAR(32),
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
			quantity: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			buy_now: {
				type: Sequelize.BOOLEAN,
				allowNull: false,
				defaultValue: true
			},
			added_on: {
				type: Sequelize.DATE,
				allowNull: false
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_shopping_cart_cart_id',
				fields: ['cart_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
