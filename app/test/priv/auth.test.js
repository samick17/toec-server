const {assert} = require('chai');
const Auth = require('@Priv/auth');

describe('auth', () => {
	it('generateToken and validateToken', async () => {
		let token = await Auth.generateToken({
			name: 'Samick',
			email: 'Samick.Hsu@gmail.com'
		});
		let tokenInfo = Auth.validateToken(token, 'Samick', 'Samick.Hsu@gmail.com');
		assert.isTrue(tokenInfo.isValid);
	});

	it('generateToken and validate with wrong name', async () => {
		let token = await Auth.generateToken({
			name: 'Samick',
			email: 'Samick.Hsu@gmail.com'
		});
		let tokenInfo = Auth.validateToken(token, 'Samick1', 'Samick.Hsu@gmail.com');
		assert.isFalse(tokenInfo.isValid);
		assert.deepEqual(tokenInfo.reason, {
			code: 'USR_13',
			message: 'Invalid name: "${name}"'
		});
	});

	it('generateToken and validate with wrong email', async () => {
		let token = await Auth.generateToken({
			name: 'Samick',
			email: 'Samick.Hsu@gmail.com'
		});
		let tokenInfo = Auth.validateToken(token, 'Samick', 'Samick1.Hsu@gmail.com');
		assert.isFalse(tokenInfo.isValid);
		assert.deepEqual(tokenInfo.reason, {
			code: 'USR_03',
			message: 'Email "${email}" format error.'
		});
	});
});
