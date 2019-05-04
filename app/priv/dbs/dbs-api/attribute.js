function init(seq, APIs) {
	const DataWrapper = require('../utility/data-wrapper');
	const {
		Product,
		Attribute,
		AttributeValue,
		ProductAttribute
	} = seq.models;
	function attributeToJson(attribute) {
		return DataWrapper.exportData(attribute, [
			'attribute_value_id',
			'value'
			]);
	}
	let api = {
		getAttributes: async function() {
			let attributes = await Attribute.findAll();
			return attributes.map(attribute => attribute.dataValues);
		},
		// * attributeId
		getAttributeById: async function(attributeId) {
			let attribute = await Attribute.findOne({
				where: {
					attribute_id: attributeId
				}
			});
			if(attribute) return attribute.dataValues;
		},
		// * attributeId
		getAttributeValues: async function(attributeId) {
			let attributes = await AttributeValue.findAll({
				where: {
					attribute_id: attributeId
				}
			});
			return attributes.map(attributeToJson);
		},
		// * productId
		getAttributesWithProductId: async function(productId) {
			let attributes = await AttributeValue.findAll({
				include: [{
					model: Product,
					where: {
						product_id: productId
					}
				}, {
					model: Attribute
				}]
			});
			if(attributes) {
				return attributes.map(attribute => {
					let jsonData = attributeToJson(attribute);
					return {
						attribute_name: attribute.dataValues.Attribute.dataValues.name,
						attribute_value_id: jsonData.attribute_value_id,
						attribute_value: jsonData.value
					};
				});
			}
		}
	};
	APIs.AttributeAPI = api;
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
		// let attributes = await API.getAttributes();
		// console.log(attributes);
		// let attribute = await API.getAttributeById(1);
		// console.log(attribute);
		// let attributes = await API.getAttributeValues(1);
		// console.log(attributes);
		let attributes = await API.getAttributesWithProductId(1);
		console.log(attributes);
	})();
}
