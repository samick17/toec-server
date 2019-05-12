const DB = require('@DB');
const router = require('koa-router')();
const TaxError = require('@Priv/error/tax');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');

router.get('/', async (ctx) => {
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.TaxAPI.getTaxes();
		}
	});
});

router.get('/:taxId', async (ctx) => {
	let {
		taxId
	} = ctx.params;
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.TaxAPI.getTaxById(taxId);
		},
		onError: () => {
			return {
				code: TaxError.IDNotFound,
				args: {
					id: taxId
				}
			};
		}
	});
});

module.exports = router;
