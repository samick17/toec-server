const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Category',
		name: 'category',
		properties: {
			category_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			department_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			name: {
				type: Sequelize.STRING(100),
				allowNull: false
			},
			description: {
				type: Sequelize.STRING(1000)
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_category_department_id',
				fields: ['department_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
