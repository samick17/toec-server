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

async function delay(ms) {
	return new Promise(resolve => {
		setTimeout(resolve, ms)
	});
}

async function buildDocker() {
	let cwd = path.join(__dirname, '../app');
	let tag = 'toec_server';
	await asyncSpawn(cwd, 'docker', ['stack', 'rm', tag]);
	await asyncSpawn(cwd, 'docker', ['rmi', `${tag}:latest`]);
	await asyncSpawn(cwd, 'docker', ['build', '.', '-t', `${tag}:latest`]);
	await delay(5000);
	return await asyncSpawn(cwd, 'docker', ['stack', 'deploy', '-c', 'stack.yml', tag]);
}

(async () => {
	await buildDocker();
})();
