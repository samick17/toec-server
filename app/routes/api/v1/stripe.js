const router = require('koa-router')();
const StripeError = require('@Priv/error/stripe');
const Validator = require('@Priv/validator');

router.post('/charge', async (ctx) => {
	let {
		stripeToken,
		order_id,
		description,
		amount,
		currency // optional
	} = ctx.request.body;
	order_id = parseInt(order_id);
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
