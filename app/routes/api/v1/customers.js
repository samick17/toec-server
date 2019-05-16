const DB = require('@DB');
const router = require('koa-router')();
const UserError = require('@Priv/error/user');
const ErrorHandler = require('@Priv/error-handler');
const Auth = require('@Priv/auth');
const RouteUtils = require('@Priv/route-utils');
const Validator = require('@Priv/validator');

router.post('/', async (ctx) => {
	let {
		name,
		email,
		password
	} = ctx.request.body;
	Validator.requireArgs({
		name, email, password
	}, UserError, 'FieldsRequired');
	Validator.validateStrLenRange(name, 1, 50, UserError, 'NameNotString', 'NameOutOfRange');
	Validator.validateEmail(email, UserError, 'InvalidEmailFormat');
	Validator.validateStr(password, UserError, 'PasswordNotString');
	let APIs = DB.getAPIs();
	let countOfEmail = await APIs.CustomerAPI.countOfEmail(email);
	if(countOfEmail !== 0) {
		ErrorHandler.handle(UserError.DuplicatedEmail, {
			email: email
		});
	} else {
		let customerJsonData = await APIs.CustomerAPI.register(name, email, password);
		await RouteUtils.responseUserData(ctx, customerJsonData);
	}
});

router.post('/login', async (ctx) => {
	let {
		email,
		password
	} = ctx.request.body;
	Validator.requireArgs({
		email, password
	}, UserError, 'FieldsRequired');
	let APIs = DB.getAPIs();
	let customerJsonData = await APIs.CustomerAPI.auth(email, password);
	await RouteUtils.responseUserData(ctx, customerJsonData);
});

router.post('/facebook', async (ctx) => {
	ctx.body = {};
});

router.get('/logout', async (ctx) => {
	ctx.session = null;
	ctx.body = {};
});

router.put('/address', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	let {
		address_1,
		address_2, // optional
		city,
		region,
		postal_code,
		country,
		shipping_region_id
	} = ctx.request.body;
	Validator.requireArgs({
		address_1, city, region, postal_code, country, shipping_region_id
	}, UserError, 'FieldsRequired');
	Validator.validateInteger(shipping_region_id, UserError, 'ShippingRegionIDNotNumber');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CustomerAPI.updateAddress(customerId, address_1, city, region, postal_code, country, shipping_region_id, {address_2});
	ctx.body = jsonData;
});

router.put('/creditCard', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	let {
		credit_card
	} = ctx.request.body;
	Validator.requireArgs({
		credit_card
	}, UserError, 'FieldsRequired');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CustomerAPI.updateCreditCard(customerId, credit_card);
	ctx.body = jsonData;
});

module.exports = router;
