const path = require('path');
const spawn = require('child_process').spawn;

function asyncSpawn(cwd, cmd, args) {
	return new Promise(resolve => {
		let proc = spawn(cmd, args, {
			stdio: 'inherit',
			cwd: cwd
		});
		proc.on('close', () => {
			resolve();
		});
	});
}

function buildDocker() {
	let cwd = path.join(__dirname, '../app');
	return asyncSpawn(cwd, 'docker-compose', ['up'/*, '-d'*/, '--build']);
}

(async () => {
	await buildDocker();
})();
