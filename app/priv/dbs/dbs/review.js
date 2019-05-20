const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Review',
		name: 'review',
		properties: {
			review_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			customer_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			product_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			review: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			rating: {
				type: Sequelize.SMALLINT,
				allowNull: false
			},
			created_on: {
				type: Sequelize.DATE,
				allowNull: false,
				defaultValue: Sequelize.NOW
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_review_customer_id',
				fields: ['customer_id']
			},
			{
				name: 'idx_review_product_id',
				fields: ['product_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
