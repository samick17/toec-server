const DB = require('@DB');
const router = require('koa-router')();
const CategoryError = require('@Priv/error/category');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');

router.get('/', async (ctx) => {
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.CategoryAPI.getCategories();
		}
	});
});

router.get('/:categoryId', async (ctx) => {
	let {
		categoryId
	} = ctx.params;
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.CategoryAPI.getCategoryById(categoryId);
		},
		onError: () => {
			return {
				code: CategoryError.IDNotFound,
				args: {
					id: categoryId
				}
			};
		}
	});
});

router.get('/inProduct/:productId', async (ctx) => {
	let {
		productId
	} = ctx.params;
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.CategoryAPI.getCategoriesOfProduct(productId);
		},
		onError: () => {
			return {
				code: CategoryError.InvalidProductID,
				args: {
					productId: productId
				}
			};
		}
	});
});

router.get('/inDepartment/:departmentId', async (ctx) => {
	let {
		departmentId
	} = ctx.params;
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.CategoryAPI.getCategoriesOfDepartment(departmentId);
		},
		onError: () => {
			return {
				code: CategoryError.InvalidDepartmentID,
				args: {
					departmentId: departmentId
				}
			};
		}
	});
});

module.exports = router;
