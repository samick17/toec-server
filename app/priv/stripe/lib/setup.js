const PUBKeys = {
	Live: process.env.TOEC_STRIPE_LIVE_PUBKEY,
	Test: process.env.TOEC_STRIPE_TEST_PUBKEY,
	Demo: process.env.TOEC_STRIPE_DEMO_PUBKEY
};
const SECKeys = {
	Live: process.env.TOEC_STRIPE_LIVE_SECKEY,
	Test: process.env.TOEC_STRIPE_TEST_SECKEY,
	Demo: process.env.TOEC_STRIPE_DEMO_SECKEY
};
const EnvParams = require('@Env');

const Keys = (() => {
	switch(EnvParams.mode) {
		case 'prod':
		return {
			Publishable: PUBKeys.Demo,
			Secret: SECKeys.Demo
		};
		break;
		case 'stage':
		return {
			Publishable: PUBKeys.Test,
			Secret: SECKeys.Test
		};
		break;
		case 'dev':
		return {
			Publishable: PUBKeys.Test,
			Secret: SECKeys.Test
		};
		break;
		case 'test':
		return {
			Publishable: PUBKeys.Test,
			Secret: SECKeys.Test
		};
		break;
		default:
		return {
			Publishable: PUBKeys.Test,
			Secret: SECKeys.Test
		};
		break;
	}
})();

const stripe = require('stripe')(Keys.Secret);

const APIs = require('./api').create(stripe);

module.exports = {
	stripe,
	APIs,
	PublishableKey: Keys.Publishable
};
