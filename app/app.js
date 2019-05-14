const Koa = require('koa');
const views = require('koa-views');
const json = require('koa-json');
const onerror = require('koa-onerror');
const bodyparser = require('koa-bodyparser');
const logger = require('koa-logger');
const session = require('koa-session2');
const redisStore = require('@Priv/redis-store');
const api = require('@Route/api');
const redisClient = require('@Priv/redis-client').client;
const Env = require('@Env');

function createApp() {
	const app = new Koa();
	app.keys = [Env.TOEC_APP_KEY];
	const SessionConfig = {
		key: Env.TOEC_COOKIE_KEY,
		maxAge: 86400000,
		autoCommit: true,
		overwrite: true,
		httpOnly: true,
		signed: true,
		rolling: false,
		renew: true,
		store: redisStore({
			client: redisClient
		})
	};
	// error handler
	onerror(app);
	app.use(session(SessionConfig, app));

	// middlewares
	app.use(bodyparser({
		enableTypes:['json', 'form', 'text']
	}));
	app.use(json());
	app.use(logger());
	app.use(require('koa-static')(__dirname + '/public'));

	app.use(views(__dirname + '/views', {
		extension: 'pug'
	}));

	// logger
	app.use(async (ctx, next) => {
		const start = new Date();
		await next();
		const ms = new Date() - start;
		console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
	});

	// routes
	app.use(api.routes(), api.allowedMethods());
	app.use(ctx => {
		ctx.session.refresh();
	});

	// error-handling
	app.on('error', (err, ctx) => {
		console.error('server error', err, ctx)
	});
	return app;
}

module.exports = {
	createApp: createApp
};
