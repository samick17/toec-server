const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@ErrorHandler');

// TODO validate query params.
router.get('/', async (ctx) => {
	let {
		page,
		limit,
		description_length
	} = ctx.query;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProducts({
		page: parseInt(page),
		limit: parseInt(limit),
		descriptionLength: parseInt(description_length)
	});
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'products'
		});
	}
});

router.get('/search', async (ctx) => {
	let {
		query_string,
		all_words,
		page,
		limit,
		description_length
	} = ctx.query;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.searchProducts(query_string, {
		allWords: ['on', 'off'].indexOf(all_words) >= 0 ? all_words : 'on',
		page: parseInt(page),
		limit: parseInt(limit),
		descriptionLength: parseInt(description_length)
	});
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'products'
		});
	}
});

router.get('/:productId', async (ctx) => {
	let {
		productId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProductById(productId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `product:${productId}`
		});
	}
});

router.get('/inCategory/:categoryId', async (ctx) => {
	let {
		categoryId
	} = ctx.params;
	let {
		page,
		limit,
		description_length
	} = ctx.query;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProductsByCategoryId(categoryId, {
		page: parseInt(page),
		limit: parseInt(limit),
		descriptionLength: parseInt(description_length)
	});
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `category:${categoryId}`
		});
	}
});

router.get('/inDepartment/:departmentId', async (ctx) => {
	let {
		departmentId
	} = ctx.params;
	let {
		page,
		limit,
		description_length
	} = ctx.query;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProductsByDepartmentId(departmentId, {
		page: parseInt(page),
		limit: parseInt(limit),
		descriptionLength: parseInt(description_length)
	});
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `department:${departmentId}`
		});
	}
});

//
router.get('/:productId/details', async (ctx) => {
	let {
		productId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProductDetailById(productId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `product:${productId}`
		});
	}
});

router.get('/:productId/locations', async (ctx) => {
	let {
		productId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProductLocations(productId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `product:${productId}`
		});
	}
});

router.get('/:productId/reviews', async (ctx) => {
	let {
		productId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.getProductReviewById(productId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `product:${productId}`
		});
	}
});

router.post('/:productId/reviews', async (ctx) => {
	// TODO get customerId by session
	let customerId = 1;
	let {
		productId
	} = ctx.params;
	let {
		review,
		rating
	} = ctx.request.body;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ProductAPI.createProductReview(customerId, productId, review, rating);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `product:${productId}`
		});
	}
});

module.exports = router;
