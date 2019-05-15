const DB = require('@DB');
const router = require('koa-router')();
const CategoryError = require('@Priv/error/category');
const PaginationError = require('@Priv/error/pagination');
const DepartmentError = require('@Priv/error/department');
const ProductError = require('@Priv/error/product');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');
const Validator = require('@Priv/validator');

router.get('/', async (ctx) => {
	let {
		order = '',// one of {category_id, name}
		page = 1,
		limit = 20
	} = ctx.query;
	page = parseInt(page);
	limit = parseInt(limit);
	Validator.validateStrEnum(order, ['', 'category_id,ASC', 'category_id,DESC', 'name,ASC', 'name,DESC'], PaginationError, 'InvalidOrderFormat');
	Validator.validateIntegerRange(page, 1, Infinity, PaginationError, 'PageNotNumber', 'PageOutOfRange');
	Validator.validateIntegerRange(limit, 1, 500, PaginationError, 'LimitNotNumber', 'LimitOutOfRange');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.CategoryAPI.getCategories({order, page, limit});
		}
	});
});

router.get('/:categoryId', async (ctx) => {
	let {
		categoryId
	} = ctx.params;
	categoryId = parseInt(categoryId);
	Validator.validateInteger(categoryId, CategoryError, 'IDNotNumber');
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
	productId = parseInt(productId);
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
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
	departmentId = parseInt(departmentId);
	Validator.validateInteger(departmentId, DepartmentError, 'IDNotNumber');
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
