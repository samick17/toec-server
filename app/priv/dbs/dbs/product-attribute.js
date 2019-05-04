const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'ProductAttribute',
		name: 'product_attribute',
		properties: {
			product_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false
			},
			attribute_value_id: {
				type: Sequelize.INTEGER,
				primaryKey: true,
				allowNull: false
			}
		}
	};
}

module.exports = {
	init: init
};
