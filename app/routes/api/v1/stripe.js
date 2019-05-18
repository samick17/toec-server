const router = require('koa-router')();
const StripeError = require('@Priv/error/stripe');
const Validator = require('@Priv/validator');
const RouteUtils = require('@Priv/route-utils');

router.post('/charge', async (ctx) => {
	await RouteUtils.auth(ctx);
	let {
		stripeToken,
		order_id,
		description,
		amount,
		currency = 'USD' // optional
	} = ctx.request.body;
	order_id = parseInt(order_id);
	console.log(ctx.request.body);
	// TODO with stripe API
	Validator.requireArgs({
		stripeToken,
		order_id,
		description,
		amount
	}, StripeError, 'FieldsRequired');
	ctx.body = {};
});

router.post('/stripe/webhooks', async (ctx) => {
	ctx.body = {};
});

module.exports = router;
