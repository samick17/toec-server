const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');
const UserError = require('@Priv/error/user');
const RouteUtils = require('@Priv/route-utils');

router.put('/', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	let {
		name,
		email,
		password,
		day_phone,
		eve_phone,
		mob_phone
	} = ctx.request.body;
	Validator.requireArgs({
		name, email
	}, UserError, 'FieldsRequired');
	if(typeof day_phone === 'string') {
		Validator.validatePhoneNumber(day_phone, UserError, 'PhoneFormatError');
	}
	if(typeof eve_phone === 'string') {
		Validator.validatePhoneNumber(eve_phone, UserError, 'PhoneFormatError');
	}
	if(typeof mob_phone === 'string') {
		Validator.validateMobPhoneNumber(mob_phone, UserError, 'MobPhoneFormatError');
	}
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CustomerAPI.updateProfile(customerId, name, email, {
		password,
		day_phone,
		eve_phone,
		mob_phone
	});
	ctx.body = jsonData;
});

// redis -> headers token -> error
router.get('/', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	if(customerId) {
		let APIs = DB.getAPIs();
		let jsonData = await APIs.CustomerAPI.getCustomerById(customerId);
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle(UserError.InvalidUserID, {
			userId: customerId
		});
	}
});

module.exports = router;