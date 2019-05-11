const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');

router.get('/', async (ctx) => {
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CategoryAPI.getCategories();
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'categories'
		});
	}
});

router.get('/:categoryId', async (ctx) => {
	let {
		categoryId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CategoryAPI.getCategoryById(categoryId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `category:${categoryId}`
		});
	}
});

router.get('/inProduct/:productId', async (ctx) => {
	let {
		productId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CategoryAPI.getCategoriesOfProduct(productId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `inProduct:${productId}`
		});
	}
});

router.get('/inDepartment/:departmentId', async (ctx) => {
	let {
		departmentId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.CategoryAPI.getCategoriesOfDepartment(departmentId);
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `inDepartment:${departmentId}`
		});
	}
});

module.exports = router;
