const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Department',
		name: 'department',
		properties: {
			department_id: {
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
				type: Sequelize.STRING(1000)
			}
		}
	};
}

module.exports = {
	init: init
};
