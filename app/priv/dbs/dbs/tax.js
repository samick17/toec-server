const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Tax',
		name: 'tax',
		properties: {
			tax_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			tax_type: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			tax_percentage: {
				type: Sequelize.NUMERIC(10, 2),
				allowNull: false
			}
		}
	};
}

module.exports = {
	init: init
};
