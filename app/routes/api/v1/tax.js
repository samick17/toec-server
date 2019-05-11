const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');

router.get('/', async (ctx) => {
	let APIs = DB.getAPIs();
	let jsonData = await APIs.TaxAPI.getTaxes();
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'tax'
		});
	}
});

router.get('/:taxId', async (ctx) => {
	let {
		taxId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.TaxAPI.getTaxById(taxId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `tax:${taxId}`
		});
	}
});

module.exports = router;
