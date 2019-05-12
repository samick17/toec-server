const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');
const UserError = require('@Priv/error/user');
const Auth = require('@Priv/auth');

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
});

// redis -> headers token -> error
router.get('/', async (ctx) => {
	console.log(ctx.session)
	let APIs = DB.getAPIs();
	let customerId = ctx.session.uid || await (async () => {
		let accessToken = ctx.headers['user-key'];
		let validationData = Auth.validateToken(accessToken, ctx.session.name, ctx.session.email);
		if(validationData.isValid) {
			let tokenInfo = validationData.info;
			return tokenInfo.uid;
		} else {
			ErrorHandler.handle(validationData.reason, {
				name: ctx.session.name,
				email: ctx.session.email,
				token: accessToken
			});
		}
	})();
	if(customerId) {
		let jsonData = await APIs.CustomerAPI.getCustomerById(customerId);
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle(UserError.InvalidUserID, {
			userId: customerId
		});
	}
});

module.exports = router;
