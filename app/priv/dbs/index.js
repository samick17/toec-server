const SetupEnv = require('./utility/setup-env');
const DBWrapper = require('./db-wrapper');
const DBAPIs = require('./dbs-api');

function initializeAPI(seq) {
	let apis = {};
	DBAPIs.init(seq, apis);
	return apis;
}

async function init(env, dbOptions) {
	SetupEnv.init(env);
	let seq = await DBWrapper.init(dbOptions);
	let APIs = initializeAPI(seq);
	return {
		seq,
		APIs
	};
}

module.exports = {
	init: init
};

async function main() {
	try {
		const seq = await init();
		let categories = await seq.models.Category.findAll();
		console.log(categories);
	} catch(err) {
		console.log(err);
	}
}

if(module.id === '.') {
	(async () => {
		await main();
	})();
}
