const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');

router.get('/', async (ctx) => {
	let APIs = DB.getAPIs();
	let jsonData = await APIs.AttributeAPI.getAttributes();
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'departments'
		});
	}
});

router.get('/:attributeId', async (ctx) => {
	let {
		attributeId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.AttributeAPI.getAttributeById(attributeId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: attributeId
		});
	}
});

router.get('/values/:attributeId', async (ctx) => {
	let {
		attributeId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.AttributeAPI.getAttributeValues(attributeId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `values:${attributeId}`
		});
	}
});

router.get('/inProduct/:productId', async (ctx) => {
	let {
		productId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.AttributeAPI.getAttributesWithProductId(productId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `inProduct:${productId}`
		});
	}
});

module.exports = router;
