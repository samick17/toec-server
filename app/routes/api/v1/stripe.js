const DB = require('@DB');
const router = require('koa-router')();
const StripeError = require('@Priv/error/stripe');
const Validator = require('@Priv/validator');
const RouteUtils = require('@Priv/route-utils');
const StripeAPIs = require('@Priv/stripe').APIs;

router.post('/charge', async (ctx) => {
	try {
		let tokenInfo = await RouteUtils.auth(ctx);
		console.log('Token info');
		console.log(tokenInfo);
		let {uid, email, cartId} = tokenInfo;
		let customerId = uid;
		let {
			stripeToken,
			order_id,
			description,
			amount,
			currency = 'USD' // optional
		} = ctx.request.body;
		order_id = parseInt(order_id);
		amount = parseInt(amount * 100);
		Validator.requireArgs({
			stripeToken,
			order_id,
			description,
			amount
		}, StripeError, 'FieldsRequired');
		let chargeData = {
			amount,
			currency,
			source: stripeToken,
			description,
			metadata: {
				order_id
			},
			receipt_email: email
		};
		ctx.body = await StripeAPIs.createCharge(chargeData);
		let APIs = DB.getAPIs();
		 await APIs.ShoppingCartAPI.emptyCart(cartId);
	} catch(err) {
		throw err;
	}
});

router.post('/webhooks', async (ctx) => {
	let {
		body
	} = ctx.request;
	const {
		created,
		livemode,
		id,
		type,
		object,
		request,
		pending_webhooks,
		api_version,
		// data
	} = body;
	console.log([
		`Created: ${created}`,
		`LiveMode: ${livemode}`,
		`Id: ${id}`,
		`Type: ${type}`,
		`Object: ${object}`,
		`Request: ${request}`,
		`PendingWebHooks: ${pending_webhooks}`,
		`APIVersion: ${api_version}`,
	].join('\n'));
	// console.log(data.object);
	ctx.body = {};
});

module.exports = router;
