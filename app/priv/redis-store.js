const {Store} = require('koa-session2');

class RedisStore extends Store {

	constructor(opts) {
		super();
		Object.assign(this, opts);
	}

	async get(sid, ctx) {
		let data = await this.client.getAsync(`SESSION:${sid}`);
		return JSON.parse(data);
	}

	async set(session, { sid = this.getID(24), maxAge = 1000000 } = {}, ctx) {
		try {
			await this.client.setAsync(`SESSION:${sid}`, JSON.stringify(session), 'EX', maxAge / 1000);
		} catch(er) {}
		return sid;
	}

	async destroy(sid, ctx) {
		console.log('delete');
		return await this.client.delAsync(`SESSION:${sid}`);
	}
}

module.exports = function(opts) {
	return new RedisStore(opts);
};
