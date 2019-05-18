const Auth = require('./auth');
const ErrorHandler = require('./error-handler');
const UserError = require('./error/user');

async function auth(ctx) {
	return ctx.session.uid || await (async () => {
		let accessToken = ctx.headers['user-key'];
		let validationData = Auth.validateToken(accessToken, ctx.session.name, ctx.session.email);
		if(validationData.isValid) {
			let tokenInfo = validationData.info;
			ctx.session.uid = tokenInfo.uid;
			return tokenInfo.uid;
		} else {
			ErrorHandler.handle(validationData.reason, {
				name: ctx.session.name,
				email: ctx.session.email,
				token: accessToken
			});
		}
	})();
}

async function responseUserData(ctx, userJsonData) {
	if(userJsonData) {
		const ExpiresIn = '24h';
		let uid = userJsonData.customer_id;
		let name = userJsonData.name;
		let email = userJsonData.email;
		let accessToken = await Auth.generateToken({
			uid: uid,
			name: name,
			email: email
		}, {
			expiresIn: ExpiresIn
		});
		ctx.session.uid = uid;
		ctx.session.name = name;
		ctx.session.email = email;
		let jsonData = {
			customer: userJsonData,
			accessToken: accessToken,
			expires_in: ExpiresIn
		};
		ctx.body = jsonData;
	} else {
		ErrorHandler.handle(UserError.InvalidEmailOrPW);
	}
}

module.exports = {
	auth: auth,
	responseUserData: responseUserData
};
