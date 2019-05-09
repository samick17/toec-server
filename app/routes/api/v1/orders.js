const router = require('koa-router')();

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
	let APIs = DB.getAPIs();
	let jsonData = await APIs.OrdersAPI.getOrderDetails(orderId);
	ctx.body = jsonData;
});

// TODO
router.get('/inCustomer', async (ctx) => {
	ctx.body = {};
});

router.get('/shortDetail/:orderId', async (ctx) => {
	let {
		orderId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.OrdersAPI.getOrdersShortDetail(orderId);
	ctx.body = jsonData;
});

module.exports = router;
