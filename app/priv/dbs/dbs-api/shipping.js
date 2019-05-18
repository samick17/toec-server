function init(seq, APIs) {
	const {
		Shipping,
		ShippingRegion
	} = seq.models;
	let api = {
		getShippingRegions: async function() {
			let shippings = await ShippingRegion.findAll();
			return shippings.map(shipping => shipping.dataValues);
		},
		// * shippingRegionId
		getShippingRegionById: async function(shippingRegionId) {
			let shippings = await Shipping.findAll({
				where: {
					shipping_region_id: shippingRegionId
				}
			});
			return shippings.map(shipping => shipping.dataValues);
		}
	};
	APIs.ShippingAPI = api;
	return api;
}

module.exports = {
	init: init
};

if(module.id === '.') {
	const DBWrapper = require('../db-wrapper');
	(async () => {
		const seq = await DBWrapper.init();
		let API = init(seq, {});
		let regions = await API.getShippingRegions();
		console.log(regions);
		// let region = await API.getShippingRegionById(2);
		// console.log(region);
	})();
}
