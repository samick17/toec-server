const jwt = require('jsonwebtoken');
const fs = require('fs');
const path = require('path');
const PrivateKey = fs.readFileSync(path.join(__dirname, '../env/private.key'));

async function generateToken(tokenInfo, tokenOpts) {
	return new Promise((resolve, reject) => {
		jwt.sign(Object.assign(tokenInfo, {
			iat: Math.floor(Date.now() * 0.001)
		}), PrivateKey, Object.assign({
			algorithm: 'RS256',
			expiresIn: '24h'
		}, tokenOpts), (err, key) => {
			err ? reject(err) : resolve(`Bearer ${key}`);
		});
	});
}
function isExpired(timestamp, tokenInfo) {
	return timestamp < tokenInfo.iat * 1000 || timestamp > tokenInfo.exp * 1000;
}
function getTokenInfo(token) {
	token = token.replace('Bearer ', '');
	return jwt.decode(token);
}
function validateToken(token, name, email) {
	if(typeof token !== 'string') {
		return {
			isValid: false,
			reason: 'InvalidToken'
		};
	}
	let tokenInfo = getTokenInfo(token);
	if(tokenInfo === null) {
		return {
			isValid: false,
			reason: 'InvalidToken'
		};
	}
	let timestamp = Date.now();
	if(isExpired(timestamp, tokenInfo)) {
		return {
			isValid: false,
			reason: 'TokenExpired'
		};
	}
	if(tokenInfo.name !== name) {
		return {
			isValid: false,
			reason: 'InvalidName'
		};
	}
	if(tokenInfo.email !== email) {
		return {
			isValid: false,
			reason: 'InvalidEmail'
		};
	}
	return {
		isValid: true
	};
}

module.exports = {
	generateToken: generateToken,
	getTokenInfo: getTokenInfo,
	validateToken: validateToken
};
