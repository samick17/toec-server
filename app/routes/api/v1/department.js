const DB = require('@DB');
const router = require('koa-router')();
const DepartmentError = require('@Priv/error/department');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');
const Validator = require('@Priv/validator');

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
	departmentId = parseInt(departmentId);
	Validator.validateInteger(departmentId, DepartmentError, 'IDNotNumber');
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
