const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Product',
		name: 'product',
		properties: {
			product_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(1000),
				allowNull: false
			},
			price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false
			},
			discounted_price: {
				type: Sequelize.DECIMAL(10, 2),
				allowNull: false,
				defaultValue: '0.00'
			},
			image: {
				type: Sequelize.STRING(150)
			},
			image_2: {
				type: Sequelize.STRING(150)
			},
			thumbnail: {
				type: Sequelize.STRING(150)
			},
			display: {
				type: Sequelize.SMALLINT(6),
				allowNull: false,
				defaultValue: '0'
			}
		},
		options: {
			indexes: [
			{
				type: 'FULLTEXT',
				name: 'idx_ft_product_name_description',
				fields: ['name', 'description']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
