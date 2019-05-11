const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');
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
	ctx.body = {};
});

// redis -> headers token -> error
router.get('/', async (ctx) => {
	let APIs = DB.getAPIs();
	let customerId = ctx.session.uid || await (async () => {
		let accessToken = ctx.headers['user-key'];
		let tokenInfo = Auth.getTokenInfo(accessToken);
		let validationData = Auth.validateToken(accessToken, ctx.session.name, ctx.session.email);
		if(validationData.isValid) {
			return tokenInfo.uid;
		} else {
			ErrorHandler.handle(validationData.reason);
		}
		
	})();
	if(customerId) {
		let jsonData = await APIs.CustomerAPI.getCustomerById(customerId);
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'userId'
		});
	}
});

module.exports = router;
