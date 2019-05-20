const redis = require('redis');
const {promisify} = require('util');

const processEnv = process.env;
const RedisUrl = (processEnv.REDIS_NAME && processEnv.REDIS_PORT) ? `redis://${processEnv.REDIS_NAME}:${processEnv.REDIS_PORT}` : undefined;
const logs = [];

const redisClient = redis.createClient({
	url: RedisUrl,
	retry_strategy: (options) => {
		options.error && logs.push({
			code: options.error.code
		});
		return Math.min(options.attempt * 100, 3000);
	}
});
redisClient.on('error', () => {

});
redisClient.getAsync = promisify(redisClient.get);
redisClient.setAsync = promisify(redisClient.set);
redisClient.delAsync = promisify(redisClient.del);

module.exports = {
	url: RedisUrl,
	client: redisClient,
	logs: logs
};
