const DB = require('@DB');
const router = require('koa-router')();
const AttributeError = require('@Priv/error/attribute');
const ProductError = require('@Priv/error/product');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');
const Validator = require('@Priv/validator');

router.get('/', async (ctx) => {
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.AttributeAPI.getAttributes();
		}
	});
});

router.get('/:attributeId', async (ctx) => {
	let {
		attributeId
	} = ctx.params;
	Validator.validateInteger(attributeId, AttributeError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.AttributeAPI.getAttributeById(attributeId);
		},
		onError: () => {
			return {
				code: AttributeError.IDNotFound,
				args: {
					id: attributeId
				}
			};
		}
	});
});

router.get('/values/:attributeId', async (ctx) => {
	let {
		attributeId
	} = ctx.params;
	Validator.validateInteger(attributeId, AttributeError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.AttributeAPI.getAttributeValues(attributeId);
		},
		onError: () => {
			return {
				code: AttributeError.IDNotFound,
				args: {
					id: attributeId
				}
			};
		}
	});
});

router.get('/inProduct/:productId', async (ctx) => {
	let {
		productId
	} = ctx.params;
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.AttributeAPI.getAttributesWithProductId(productId);
		},
		onError: () => {
			return {
				code: AttributeError.InvalidProductID,
				args: {
					productId: productId
				}
			};
		}
	});
});

module.exports = router;
