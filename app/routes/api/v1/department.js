const DB = require('@DB');
const router = require('koa-router')();
const DepartmentError = require('@Priv/error/department');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');

router.get('/', async (ctx) => {
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.DepartmentAPI.getDepartments();
		}
	});
});

router.get('/:departmentId', async (ctx) => {
	let {
		departmentId
	} = ctx.params;
	await RouteHandler.handleModel(ctx, {
		onData: async () => {
			let APIs = DB.getAPIs();
			return await APIs.DepartmentAPI.getDepartmentById(departmentId);
		},
		onError: () => {
			return {
				code: DepartmentError.IDNotFound,
				args: {
					id: departmentId
				}
			};
		}
	});
});

module.exports = router;
