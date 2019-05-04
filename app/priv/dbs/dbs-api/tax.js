function init(seq, APIs) {
	const Tax = seq.models.Tax;
	let api = {
		getTaxes: async function() {
			let taxes = await Tax.findAll();
			return taxes.map(tax => {
				return tax.dataValues;
			});
		},
		// * taxId
		getTaxById: async function(taxId) {
			let tax = await Tax.findOne({
				where: {
					tax_id: taxId
				}
			});
			if(tax) return tax.dataValues;
		}
	};
	APIs.TaxAPI = api;
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
		let taxes = await API.getTaxes();
		console.log(taxes);
		// let tax = await API.getTaxById(2);
		// console.log(tax);
	})();
}
