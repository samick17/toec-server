const EnvParams = {};

function loadEnv() {
	const fs = require('fs');
	const path = require('path');
	let envFile = '';
	switch((process.env.NODE_ENV || '').trim()) {
		case 'production':
		envFile = '.env';
		break;
		case 'stage':
		envFile = 'stage.env';
		break;
		case 'dev':
		envFile = 'dev.env';
		break;
		case 'test':
		envFile = 'test.env';
		break;
		default:
		envFile = 'dev.env';
		break;
	}
	let envText = fs.readFileSync(path.join(__dirname, envFile)).toString();
	envText.split('\n').forEach(text => {
		let arr = text.split('=');
		let key = arr[0].trim();
		if(key && key.indexOf('#') !== 0) {
			let value = arr[1].trim();
			process.env[key] = value;
			EnvParams[key] = value;
		}
	});
}

loadEnv();

module.exports = EnvParams;
