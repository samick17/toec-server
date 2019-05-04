const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'AttributeValue',
		name: 'attribute_value',
		properties: {
			attribute_value_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			attribute_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			value: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
		},
		options: {
			indexes: [
			{
				name: 'idx_attribute_value_attribute_id',
				fields: ['attribute_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
