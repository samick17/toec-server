const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@ErrorHandler');

router.get('/regions', async (ctx) => {
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShippingAPI.getShippingRegions();
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'regions'
		});
	}
});

router.get('/regions/:shippingRegionId', async (ctx) => {
	let {
		shippingRegionId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShippingAPI.getShippingRegionById(shippingRegionId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `regions:${shippingRegionId}`
		});
	}
});

module.exports = router;
