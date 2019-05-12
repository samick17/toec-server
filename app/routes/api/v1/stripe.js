const router = require('koa-router')();
const StripeError = require('@Priv/error/stripe');

router.post('/charge', async (ctx) => {
	let {
		stripeToken,
		order_id,
		description,
		amount,
		currency // optional
	} = ctx.request.body;
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
