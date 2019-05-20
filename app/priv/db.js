const DB = require('./dbs');

let seq;
let APIs = {};

async function init() {
	let processEnv = process.env;
	let env = {
		TOEC_SECRET: processEnv.TOEC_SECRET
	};
	let missingArgs = [];
	if(!env.TOEC_SECRET) {
		missingArgs.push('TOEC_SECRET');
	}
	let dbOptionsDefs = [{
		key: 'id',
		envKey: 'TOEC_DBUSER_ID'
	},{
		key: 'pw',
		envKey: 'TOEC_DBUSER_PW'
	},{
		key: 'host',
		envKey: 'TOEC_DB_HOST'
	},{
		key: 'port',
		envKey: 'TOEC_DB_PORT'
	},{
		key: 'db',
		envKey: 'TOEC_DB_NAME'
	}];
	let dbOptions = dbOptionsDefs.reduce((m, i) => {
		let value = processEnv[i.envKey];
		if(!value) {
			missingArgs.push(i.envKey);
		}
		m[i.key] = value;
		return m;
	}, {});
	if(missingArgs.length) {
		throw new Error(`The following arguments is not defined in process.env:\n${missingArgs.join('\n')}\nPlease define and try again.`);
	}
	let dbData = await DB.init(env, dbOptions);
	seq = dbData.seq;
	APIs = dbData.APIs;
}

function close() {
	return seq.close();
}

function getSeq() {
	return seq;
}

function getAPIs() {
	return APIs;
}

module.exports = {
	init: init,
	close: close,
	getSeq: getSeq,
	getAPIs: getAPIs
};
