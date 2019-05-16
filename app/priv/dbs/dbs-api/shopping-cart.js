function init(seq, APIs) {
	const DataWrapper = require('../utility/data-wrapper');
	const uuid = require('uuid');
	const {
		ShoppingCart,
		Product
	} = seq.models;
	function itemToJson(item) {
		return DataWrapper.exportData(item, [
			'item_id',
			'attributes',
			'quantity'
			]);
	}
	function cartItemToJsonWithProductId(item) {
		let jsonData = itemToJson(item);
		let productData = item.dataValues.Product.dataValues;
		jsonData.product_id = productData.product_id;
		jsonData.name = productData.name;
		jsonData.price = productData.price;
		jsonData.subtotal = productData.price * jsonData.quantity;
		return jsonData;
	}
	function cartItemToJsonWithProductIdImage(item) {
		let jsonData = itemToJson(item);
		let productData = item.dataValues.Product.dataValues;
		jsonData.product_id = productData.product_id;
		jsonData.name = productData.name;
		jsonData.price = productData.price;
		jsonData.subtotal = productData.price * jsonData.quantity;
		jsonData.image = productData.image;
		return jsonData;
	}
	function cartItemToJson(item) {
		let jsonData = itemToJson(item);
		let productData = item.dataValues.Product.dataValues;
		jsonData.name = productData.name;
		jsonData.price = productData.price;
		jsonData.subtotal = productData.price * jsonData.quantity;
		return jsonData;
	}
	let api = {
		generateUniqueId: async function() {
			let newId = uuid.v4().replace(/-/g, '');
			let count = await ShoppingCart.count({
				where: {
					cart_id: newId
				}
			});
			return count === 0 ? newId : await this.generateUniqueId();
		},
		// * cartId
		// * productId
		// * attributes
		addProductToCart: async function(cartId, productId, attributes, {quantity, buyNow}={quantity: 1}) {
			await ShoppingCart.create({
				cart_id: cartId,
				product_id: productId,
				attributes: attributes,
				quantity: quantity,
				buy_now: buyNow,
				added_on: Date.now()
			});
			return await api.getCartById(cartId, {
				withProductId: true,
				withImage: true
			});
		},
		// * cartId
		getCartById: async function(cartId, {withProductId, withImage}={withProductId: false, withImage: false}) {
			let items = await ShoppingCart.findAll({
				include: [{
					model: Product
				}],
				where: {
					cart_id: cartId
				}
			});
			let converterFn;
			if(withProductId) {
				if(withImage) {
					converterFn = cartItemToJsonWithProductIdImage;
				} else {
					converterFn = cartItemToJsonWithProductId;
				}
			} else {
				converterFn = cartItemToJson;
			}
			return items.map(converterFn);
		},
		// * itemId
		// * quantity
		updateCartById: async function(itemId, quantity) {
			await ShoppingCart.update({
				quantity: quantity
			}, {
				where: {
					item_id: itemId
				}
			});
			let cart = await ShoppingCart.findOne({
				attributes: ['cart_id'],
				where: {
					item_id: itemId
				}
			});
			return await this.getCartById(cart.dataValues.cart_id, {
				withProductId: true
			});
		},
		// * cartId
		emptyCart: async function(cartId) {
			await ShoppingCart.destroy({
				where: {
					cart_id: cartId
				}
			});
			return [];
		},
		// * itemId
		moveProductToCart: async function(itemId, cartId) {
			await ShoppingCart.update({
				cart_id: cartId
			}, {
				where: {
					item_id: itemId
				}
			});
		},
		// * cartId
		getAmountOfCart: async function(cartId) {
			let count = await ShoppingCart.count({
				where: {
					cart_id: cartId
				}
			});
			return {
				total_amount: count
			};
		},
		// * itemId
		removeProductFromCart: async function(itemId) {
			await ShoppingCart.destroy({
				where: {
					item_id: itemId
				}
			});
		}
	};
	APIs.ShoppingCartAPI = api;
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
		let cartId = await API.generateUniqueId();
		console.log(cartId);
		// let cartId = '35ddfe3fca224ecaab3008760d462626';
		// let item = await API.addProductToCart(cartId, 5, '');
		// console.log(item);
		// let item = await API.getCartById(cartId, 1, '');
		// console.log(item);
		// let item = await API.updateCartById(1, 2);
		// console.log(item);
		// let item = await API.emptyCart(cartId);
		// console.log(item);
		// let item = await API.moveProductToCart(itemId);
		// console.log(item);
		// let amount = await API.getAmountOfCart(cartId);
		// console.log(amount);
		// await API.removeProductFromCart(1);
	})();
}
