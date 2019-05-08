const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@ErrorHandler');

router.put('/', async (ctx) => {
	// TODO get customerId by session
	let customerId = 1;
	let {
		name,
		email,
		password,
		day_phone,
		eve_phone,
		mob_phone
	} = ctx.request.body;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CustomerAPI.updateProfile(customerId, name, email, {
		password,
		day_phone,
		eve_phone,
		mob_phone
	});
	ctx.body = jsonData;
	ctx.body = {};
});

router.get('/', async (ctx) => {
	// TODO get customerId by session
	let customerId = 1;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CustomerAPI.getCustomerById(customerId);
	ctx.body = jsonData;
});

module.exports = router;
