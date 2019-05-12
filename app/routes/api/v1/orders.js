const DB = require('@DB');
const router = require('koa-router')();
const OrdersError = require('@Priv/error/orders');
const RouteHandler = require('@Priv/route-handler');

router.post('/', async (ctx) => {
	// TODO get customerId by session
	let customerId = 1;
	let {
		cart_id,
		shipping_id,
		tax_id
	} = ctx.request.body;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.OrdersAPI.createOrders(customerId, cart_id, shipping_id, tax_id);
	ctx.body = jsonData;
});

router.get('/:orderId', async (ctx) => {
	let {
		orderId
	} = ctx.params;
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

// TODO
router.get('/inCustomer', async (ctx) => {
	ctx.body = {};
});

router.get('/shortDetail/:orderId', async (ctx) => {
	let {
		orderId
	} = ctx.params;
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
