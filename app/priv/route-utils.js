const DB = require('@DB');
const Auth = require('./auth');
const ErrorHandler = require('./error-handler');
const UserError = require('./error/user');

async function auth(ctx) {
	let accessToken = ctx.headers['user-key'];
	let validationData = Auth.validateToken(accessToken, ctx.session.name, ctx.session.email);
	if(validationData.isValid) {
		let tokenInfo = validationData.info;
		ctx.session.uid = tokenInfo.uid;
		return tokenInfo;
	} else {
		ErrorHandler.handle(validationData.reason, {
			name: ctx.session.name,
			email: ctx.session.email,
			token: accessToken
		});
	}
}

async function responseUserData(ctx, userJsonData) {
	if(userJsonData) {
		const ExpiresIn = '24h';
		let uid = userJsonData.customer_id;
		let name = userJsonData.name;
		let email = userJsonData.email;
		let APIs = DB.getAPIs();
		let cartId = await APIs.ShoppingCartAPI.generateUniqueId();
		let accessToken = await Auth.generateToken({
			uid: uid,
			name: name,
			email: email,
			cartId: cartId
		}, {
			expiresIn: ExpiresIn
		});
		ctx.session.uid = uid;
		ctx.session.name = name;
		ctx.session.email = email;
		ctx.session.cartId = cartId;
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
