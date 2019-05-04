const DBWrapper = require('./db-wrapper');
const SetupEnv = require('./utility/setup-env');

async function init(env, dbOptions) {
	SetupEnv.init(env);
	return await DBWrapper.init(dbOptions);
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
