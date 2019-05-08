const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@ErrorHandler');

router.post('/', async (ctx) => {
	let {
		name,
		email,
		password
	} = ctx.request.body;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CustomerAPI.register(name, email, password);
	ctx.body = jsonData;
});

router.post('/login', async (ctx) => {
	let {
		email,
		password
	} = ctx.request.body;
	let isAuthenticated = await APIs.CustomerAPI.auth(email, password);
	ctx.body = jsonData;
});

router.post('/facebook', async (ctx) => {
	ctx.body = {};
});

router.put('/address', async (ctx) => {
	// TODO get customerId by session
	let customerId = 1;
	let {
		address_1,
		address_2, // optional
		city,
		region,
		postal_code,
		country,
		shipping_region_id
	} = ctx.request.body;
	ctx.body = {};
});

router.put('/creditCard', async (ctx) => {
	// TODO get customerId by session
	let customerId = 1;
	let {
		credit_card
	} = ctx.request.body;
	ctx.body = {};
});

module.exports = router;
