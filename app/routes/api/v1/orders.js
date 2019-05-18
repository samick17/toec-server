const DB = require('@DB');
const router = require('koa-router')();
const OrdersError = require('@Priv/error/orders');
const RouteHandler = require('@Priv/route-handler');
const Validator = require('@Priv/validator');
const RouteUtils = require('@Priv/route-utils');

router.post('/', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	let {
		cart_id,
		shipping_id,
		tax_id
	} = ctx.request.body;
	shipping_id = parseInt(shipping_id);
	tax_id = parseInt(tax_id);
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.OrdersAPI.createOrders(customerId, cart_id, shipping_id, tax_id);
		}
	});
});

router.get('/:orderId', async (ctx) => {
	await RouteUtils.auth(ctx);
	let {
		orderId
	} = ctx.params;
	orderId = parseInt(orderId);
	Validator.validateInteger(orderId, OrdersError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.OrdersAPI.getOrderDetails(orderId);
		},
		onError: () => {
			return {
				code: OrdersError.IDNotFound,
				args: {
					id: orderId
				}
			};
		}
	});
});

// Auth required
router.get('/inCustomer', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.getOrdersByCustomerId(customerId);
		}
	});
});

router.get('/shortDetail/:orderId', async (ctx) => {
	await RouteUtils.auth(ctx);
	let {
		orderId
	} = ctx.params;
	orderId = parseInt(orderId);
	Validator.validateInteger(orderId, OrdersError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.OrdersAPI.getOrdersShortDetail(orderId);
		},
		onError: () => {
			return {
				code: OrdersError.IDNotFound,
				args: {
					id: orderId
				}
			};
		}
	});
});

module.exports = router;
