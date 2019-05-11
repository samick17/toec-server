const DB = require('@DB');
const router = require('koa-router')();
const ErrorHandler = require('@Priv/error-handler');

router.get('/', async (ctx) => {
	let APIs = DB.getAPIs();
	let jsonData = await APIs.DepartmentAPI.getDepartments();
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: 'departments'
		});
	}
});

router.get('/:departmentId', async (ctx) => {
	let {
		departmentId
	} = ctx.params;
	let APIs = DB.getAPIs();
	let jsonData = await APIs.DepartmentAPI.getDepartmentById(departmentId);
	res.json(jsonData || ErrorHandler.handle('NotFound', {
		name: `department:${departmentId}`
	}));
	if(jsonData) {
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle('NotFound', {
			name: `department:${departmentId}`
		});
	}
});

module.exports = router;
