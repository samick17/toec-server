function init(seq, APIs) {
	const DataWrapper = require('../utility/data-wrapper');
	const {
		Orders,
		OrderDetail,
		ShoppingCart
	} = seq.models;
	function orderDetailsToJson(orderDetails) {
		let jsonData = DataWrapper.exportData(orderDetails.dataValues, [
			'order_id',
			'product_id',
			'attributes',
			'product_name',
			'quantity',
			'unit_cost'
			]);
		jsonData.subtotal = jsonData.quantity * jsonData.unit_cost;
		return jsonData;
	}
	function ordersToJson(orders) {
		let jsonData = DataWrapper.exportData(orders, [
			'order_id',
			'total_amount',
			'created_on',
			'shipped_on',
			'status'
			]);
		jsonData.total_amount = parseInt(jsonData.total_amount);
		return jsonData;
	}
	let api = {
		// # Auth required.
		// * customerId
		// * cartId
		// * shippingId
		// * taxId
		createOrders: async function(customerId, cartId, shippingId, taxId) {
			let t = await seq.transaction();
			let orders = await Orders.create({
				customer_id: customerId,
				cart_id: cartId,
				shipping_id: shippingId,
				tax_id: taxId,
				created_on: Date.now()
			}, {
				transaction: t
			});
			let orderId = orders.dataValues.order_id;
			const CartAPI = APIs.ShoppingCartAPI;
			let items = await CartAPI.getCartById(cartId, {withProductId: true});
			let orderDetailsDataArray = items.map(item => {
				return {
					order_id: orderId,
					product_id: item.product_id,
					attributes: item.attributes,
					product_name: item.name,
					quantity: item.quantity,
					unit_cost: item.price,
					subtotal: item.subtotal
				};
			});
			await OrderDetail.bulkCreate(orderDetailsDataArray, {
				transaction: t
			});
			let {total_amount} = await CartAPI.getAmountOfCart(cartId);
			await Orders.update({
				total_amount: total_amount
			}, {
				where: {
					order_id: orderId,
				},
				transaction: t
			});
			let tresult = await t.commit();
			return {
				orderId: orderId
			};
		},
		// # Auth required.
		// * orderId
		getOrdersShortDetail: async function(orderId) {
			let orders = await Orders.findOne({
				where: {
					order_id: orderId
				}
			});
			if(orders) return ordersToJson(orders);
		},
		// @deprecated
		// # Auth required.
		// * orderId
		// getOrderDetailsById: async function(orderId) {
		// 	let orders = await OrderDetail.findOne({
		// 		where: {
		// 			order_id: orderId
		// 		}
		// 	});
		// 	if(orders) {
		// 		return orderDetailsToJson(orders);
		// 	};
		// },
		// # Auth required.
		getOrderDetails: async function(orderId) {
			let orders = await OrderDetail.findAll({
				where: {
					order_id: orderId
				}
			});
			return orders.map(orderDetailsToJson);
		},
		dropOrders: async function(orderId) {
			let t = await seq.transaction();
			await Promise.all([
				Orders.destroy({
					where: {
						order_id: orderId
					}
				}),
				OrderDetail.destroy({
					where: {
						order_id: orderId
					}
				}, {
					transaction: t
				})
				]);
			await t.commit();
		}
	};
	APIs.OrdersAPI = api;
	return api;
}

module.exports = {
	init: init
};

if(module.id === '.') {
	const DBWrapper = require('../db-wrapper');
	(async () => {
		const seq = await DBWrapper.init();
		const APIs = {};
		let API = init(seq, APIs);
		require('./shopping-cart').init(seq, APIs);
		let cartId = '35ddfe3fca224ecaab3008760d462626';
		// let orders = await API.createOrders(1, cartId, 1, 1);
		// console.log(orders);
		// let orders1 = await API.getOrderDetailsById(6);
		// console.log(orders1);
		// let orders2 = await API.getOrderDetails(1);
		// console.log(orders2);
		// let orders1 = await API.getOrdersShortDetail(1);
		// console.log(orders1);
		// let orders1 = await API.dropOrders(6);
		// console.log(orders1);
	})();
}
