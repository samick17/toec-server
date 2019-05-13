const DB = require('@DB');
const router = require('koa-router')();
const ShippingError = require('@Priv/error/shipping');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');
const Validator = require('@Priv/validator');

router.get('/regions', async (ctx) => {
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ShippingAPI.getShippingRegions();
		}
	});
});

router.get('/regions/:shippingRegionId', async (ctx) => {
	let {
		shippingRegionId
	} = ctx.params;
	Validator.validateInteger(shippingRegionId, ShippingError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ShippingAPI.getShippingRegionById(shippingRegionId);
		},
		onError: () => {
			return {
				code: ShippingError.IDNotFound,
				args: {
					id: shippingRegionId
				}
			};
		}
	});
});

module.exports = router;
