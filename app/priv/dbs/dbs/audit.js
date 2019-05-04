const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'Audit',
		name: 'audit',
		properties: {
			audit_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			order_id: {
				type: Sequelize.INTEGER,
				allowNull: false
			},
			created_on: {
				type: Sequelize.DATE,
				allowNull: false
			},
			message: {
				type: Sequelize.TEXT,
				allowNull: false
			},
			code: {
				type: Sequelize.INTEGER,
				allowNull: false
			}
		},
		options: {
			indexes: [
			{
				name: 'idx_audit_order_id',
				fields: ['order_id']
			}
			],
			charset: 'utf8'
		}
	};
}

module.exports = {
	init: init
};
