/*
 * @CreatedDate: 2019/05/08
 * @Author: Samick.Hsu(boneache@gmail.com)
 */
//
const router = require('koa-router')();
const apiRoute = require('./v1');

const APIVersion = 'v1';
const ExportedAPIPath = '';

const allowedOrigins = [
	'http://127.0.0.1:53301',
	'http://localhost:53301',
	'https://127.0.0.1:53301',
	'https://localhost:53301'
];

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

const APIHandlerProd = async (ctx, next) => {
	await next();
};

const APIHandlerDev = async (ctx, next) => {
	let origin = ctx.headers.origin;
	console.log(origin);
	if(allowedOrigins.indexOf(origin) >= 0) {
		ctx.set('Access-Control-Allow-Origin', '*');
		console.log('asdsd');
	}
	ctx.set('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	ctx.set('Access-Control-Allow-Credentials', true);
	await next();
};

// const APIHandler = process.env === 'production' ? APIHandlerProd : APIHandlerDev;
const APIHandler = APIHandlerProd;

router.use(ExportedAPIPath, APIHandler, apiRoute.routes());

module.exports = router;
