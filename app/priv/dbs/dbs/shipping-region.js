const Sequelize = require('sequelize');

function init() {
	return {
		modelName: 'ShippingRegion',
		name: 'shipping_region',
		properties: {
			shipping_region_id: {
				type: Sequelize.INTEGER,
				autoIncrement: true,
				primaryKey: true,
				allowNull: false
			},
			shipping_region: {
				type: Sequelize.STRING(100),
				allowNull: false
			}
		}
	};
}

module.exports = {
	init: init
};
