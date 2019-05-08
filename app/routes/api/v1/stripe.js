const router = require('koa-router')();

router.post('/charge', async (ctx) => {
	let {
		stripeToken,
		order_id,
		description,
		amount,
		currency // optional
	} = ctx.request.body;
	ctx.body = {};
});

router.post('/stripe/webhooks', async (ctx) => {
	ctx.body = {};
});

module.exports = router;
