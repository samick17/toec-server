const crypto = require('crypto');
const CipherPassword = process.env.TOEC_SECRET;

async function encrypt(password) {
	return new Promise(resolve => {
		let cipher = crypto.createCipher('aes-256-ecb', CipherPassword);
		let encrypted = '';
		cipher.on('readable', () => {
			const data = cipher.read();
			if (data)
				encrypted += data.toString('utf8');
		});
		cipher.on('end', () => {
			resolve(encrypted.slice(0, 50));
		});
		cipher.write(password);
		cipher.end();
	});
}

module.exports = {
	encrypt: encrypt
};
