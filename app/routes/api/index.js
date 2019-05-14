/*
 * @CreatedDate: 2019/05/08
 * @Author: Samick.Hsu(boneache@gmail.com)
 */
//
const router = require('koa-router')();
const apiRoute = require('./v1');

const APIVersion = 'v1';
const ExportedAPIPath = '';

router.use(async (ctx, next) => {
	try {
		await next();
	} catch(err) {
		ctx.status = err.status || 500;
		ctx.body = {
			code: err.code,
			message: err.message
		};
		ctx.err = err;
	}
});

if(process.env.NODE_ENV !== 'production') {
	const allowedOrigins = [
		'http://127.0.0.1:53301',
		'http://localhost:53301',
		'https://127.0.0.1:53301',
		'https://localhost:53301'
	];
	router.use(ExportedAPIPath, async (ctx, next) => {
		let origin = ctx.headers.origin;
		if(allowedOrigins.indexOf(origin) >= 0) {
			ctx.set('Access-Control-Allow-Credentials', true);
			ctx.set('Access-Control-Allow-Origin', origin);
			await next();
		} else {
			throw new Error('Invalid request');
		}
	});

	router.options('*', async (ctx, next) => {
		let origin = ctx.headers.origin;
		if(allowedOrigins.indexOf(origin) >= 0) {
			ctx.set('Access-Control-Allow-Credentials', true);
			ctx.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
			ctx.set('Access-Control-Allow-Origin', origin);
			ctx.set('Access-Control-Allow-Headers', ctx.get('Access-Control-Request-Headers'));
			ctx.status = 204;
			await next();
		} else {
			throw new Error('Invalid request');
		}
	});
}

router.use(ExportedAPIPath, apiRoute.routes());

module.exports = router;
