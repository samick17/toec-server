const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');
const UserError = require('@Priv/error/user');
const RouteUtils = require('@Priv/route-utils');
const Validator = require('@Priv/validator');
const PublishableKey = require('@Priv/stripe').PublishableKey;

router.get('/session', async (ctx) => {
	let session = ctx.session || {};
	ctx.body = {
		cartId: session.cartId,
		uid: session.uid,
		publishableKey: PublishableKey
	};
});

router.put('/', async (ctx) => {
	let {uid} = await RouteUtils.auth(ctx);
	let customerId = uid;
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
	let {uid} = await RouteUtils.auth(ctx);
	let customerId = uid;
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
