const path = require('path');
const spawn = require('child_process').spawn;

let appDir = path.join(__dirname, '../app');
let child = spawn('docker-compose', ['up', '-d', '--build'], {
	stdio: 'inherit',
	cwd: appDir
});
