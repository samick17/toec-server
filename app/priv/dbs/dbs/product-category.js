const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'ProductCategory',
		name: 'product_category',
		properties: {
			product_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false
			},
			category_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false
			},
		}
	};
}

module.exports = {
	init: init
};
