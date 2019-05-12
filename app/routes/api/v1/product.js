const DB = require('@DB');
const router = require('koa-router')();
const ProductError = require('@Priv/error/product');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');

// TODO validate query params.
router.get('/', async (ctx) => {
	let {
		page = 1,
		limit = 20,
		description_length = 200
	} = ctx.query;
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
		limit,
		description_length
	} = ctx.query;
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
		limit,
		description_length
	} = ctx.query;
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
	let {
		productId
	} = ctx.params;
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
	let customerId = ctx.session.uid;
	let {
		productId
	} = ctx.params;
	let {
		review,
		rating
	} = ctx.request.body;
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
