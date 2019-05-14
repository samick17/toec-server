const DB = require('./dbs');

const DefaultArgs = {
	id: 'root',
	pw: 'samick17',
	host: 'localhost',
	port: 3306,
	db: 'db'
};

async function init({id, pw, host, port, db}=DefaultArgs) {
	let seq = await DB.init({
		id: id,
		pw: pw,
		host: host,
		port: port,
		db: db
	});
	return seq;
}

module.exports = {
	init: init
};
