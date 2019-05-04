const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Attribute',
		name: 'attribute',
		properties: {
			attribute_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(100),
				primaryKey: true,
				allowNull: false
			},
		}
	};
}

module.exports = {
	init: init
};
