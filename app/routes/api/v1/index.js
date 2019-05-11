const router = require('koa-router')();
const RedisClient = require('@Priv/redis-client');
const redisClient = RedisClient.client;

router.use('/categories', require('./category').routes());
router.use('/departments', require('./department').routes());
router.use('/attributes', require('./attribute').routes());
router.use('/products', require('./product').routes());
router.use('/customer', require('./customer').routes());
router.use('/customers', require('./customers').routes());
router.use('/orders', require('./orders').routes());
router.use('/shoppingcart', require('./shoppingcart').routes());
router.use('/tax', require('./tax').routes());
router.use('/shipping', require('./shipping').routes());
router.use('/stripe', require('./stripe').routes());

router.get('/test', async (ctx) => {
	redisClient.set('foo', 'bar');
	return new Promise(resolve => {
		redisClient.get('foo', (err, data) => {
			if(err) {
				ctx.body = {
					message: err.message
				};
			} else {
				ctx.body = {
					data: data
				};
			}
			resolve();
		});
	});
});

router.get('/version', function(ctx) {
	ctx.body = {
		version: '1.0.1'
	};
});

router.get('/serverinfo', function(ctx) {
	ctx.body = {
		version: '1.0.1',
    	redisURL: RedisClient.url,
    	redisLogs: RedisClient.logs
	};
});

module.exports = router;
