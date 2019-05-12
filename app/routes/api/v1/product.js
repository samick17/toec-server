const DB = require('@DB');
const router = require('koa-router')();
const ProductError = require('@Priv/error/product');
const CategoryError = require('@Priv/error/category');
const DepartmentError = require('@Priv/error/department');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');

// TODO validate query params.
router.get('/', async (ctx) => {
	let {
		page = 1,
		limit = 20,
		description_length = 200
	} = ctx.query;
	Validator.validateIntegerRange(page, 1, Infinity, ProductError, 'PageNotNumber', 'PageOutOfRange');
	Validator.validateIntegerRange(limit, 1, 500, ProductError, 'LimitNotNumber', 'LimitOutOfRange');
	Validator.validateIntegerRange(description_length, 1, Infinity, ProductError, 'DescLenNotNumber', 'DescLenOutOfRange');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProducts({
				page: parseInt(page),
				limit: parseInt(limit),
				descriptionLength: parseInt(description_length)
			});
		}
	});
});

router.get('/search', async (ctx) => {
	let {
		query_string,
		all_words = 'on',
		page = 1,
		limit = 20,
		description_length = 200
	} = ctx.query;
	Validator.requireArgs({
		query_string
	}, ProductError, 'EmptyQueryString');
	Validator.validateIntegerRange(page, 1, Infinity, ProductError, 'PageNotNumber', 'PageOutOfRange');
	Validator.validateIntegerRange(limit, 1, 500, ProductError, 'LimitNotNumber', 'LimitOutOfRange');
	Validator.validateIntegerRange(description_length, 1, Infinity, ProductError, 'DescLenNotNumber', 'DescLenOutOfRange');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.searchProducts(query_string, {
				allWords: ['on', 'off'].indexOf(all_words) >= 0 ? all_words : 'on',
				page: parseInt(page),
				limit: parseInt(limit),
				descriptionLength: parseInt(description_length)
			});
		}
	});
});

router.get('/:productId', async (ctx) => {
	let {
		productId
	} = ctx.params;
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProductById(productId);
		},
		onError: () => {
			return {
				code: ProductError.IDNotFound,
				args: {
					id: productId
				}
			};
		}
	});
});

router.get('/inCategory/:categoryId', async (ctx) => {
	let {
		categoryId
	} = ctx.params;
	let {
		page = 1,
		limit = 20,
		description_length = 200
	} = ctx.query;
	Validator.validateInteger(categoryId, CategoryError, 'IDNotNumber');
	Validator.validateIntegerRange(page, 1, Infinity, ProductError, 'PageNotNumber', 'PageOutOfRange');
	Validator.validateIntegerRange(limit, 1, 500, ProductError, 'LimitNotNumber', 'LimitOutOfRange');
	Validator.validateIntegerRange(description_length, 1, Infinity, ProductError, 'DescLenNotNumber', 'DescLenOutOfRange');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProductsByCategoryId(categoryId, {
				page: parseInt(page),
				limit: parseInt(limit),
				descriptionLength: parseInt(description_length)
			});
		},
		onError: () => {
			return {
				code: ProductError.InvalidCategoryID,
				args: {
					categoryId: categoryId
				}
			};
		}
	});
});

router.get('/inDepartment/:departmentId', async (ctx) => {
	let {
		departmentId
	} = ctx.params;
	let {
		page = 1,
		limit = 20,
		description_length = 200
	} = ctx.query;
	Validator.validateInteger(departmentId, DepartmentError, 'IDNotNumber');
	Validator.validateIntegerRange(page, 1, Infinity, ProductError, 'PageNotNumber', 'PageOutOfRange');
	Validator.validateIntegerRange(limit, 1, 500, ProductError, 'LimitNotNumber', 'LimitOutOfRange');
	Validator.validateIntegerRange(description_length, 1, Infinity, ProductError, 'DescLenNotNumber', 'DescLenOutOfRange');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProductsByDepartmentId(departmentId, {
				page: parseInt(page),
				limit: parseInt(limit),
				descriptionLength: parseInt(description_length)
			});
		},
		onError: () => {
			return {
				code: ProductError.InvalidDepartmentID,
				args: {
					departmentId: departmentId
				}
			};
		}
	});
});

//
router.get('/:productId/details', async (ctx) => {
	let {
		productId
	} = ctx.params;
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProductDetailById(productId);
		},
		onError: () => {
			return {
				code: ProductError.IDNotFound,
				args: {
					id: productId
				}
			};
		}
	});
});

router.get('/:productId/locations', async (ctx) => {
	let {
		productId
	} = ctx.params;
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProductLocations(productId);
		},
		onError: () => {
			return {
				code: ProductError.IDNotFound,
				args: {
					id: productId
				}
			};
		}
	});
});

router.get('/:productId/reviews', async (ctx) => {
	await RouteUtils.auth(ctx);
	let {
		productId
	} = ctx.params;
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.getProductReviewById(productId);
		},
		onError: () => {
			return {
				code: ProductError.IDNotFound,
				args: {
					id: productId
				}
			};
		}
	});
});

router.post('/:productId/reviews', async (ctx) => {
	let customerId = await RouteUtils.auth(ctx);
	let {
		productId
	} = ctx.params;
	let {
		review,
		rating
	} = ctx.request.body;
	Validator.validateInteger(productId, ProductError, 'IDNotNumber');
	Validator.requireArgs({
		review, rating
	}, ProductError, 'EmptyQueryString');
	Validator.validateStrLenRange(review, 1, 2048, ProductError, 'ReviewNotString', 'ReviewOutOfRange');
	Validator.validateIntegerRange(rating, 1, 10, ProductError, 'RatingNotNumber', 'RatingOutOfRange');
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.ProductAPI.createProductReview(customerId, productId, review, rating);
		},
		onError: () => {
			return {
				code: ProductError.IDNotFound,
				args: {
					id: productId
				}
			};
		}
	});
});

module.exports = router;
