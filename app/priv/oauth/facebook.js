const Axios = require('axios');

const BaseURL = 'https://graph.facebook.com/v3.3';

const ProfileFields = [
	'id',
	'name',
	'email'
].join(',');

async function getProfile(accessToken) {
	let res = await Axios.get(`${BaseURL}/me`, {
		params: {
			access_token: accessToken,
			fields: ProfileFields,
			format: 'json',
			method: 'get'
		}
	});
	return res.data;
}

module.exports = {
	getProfile
};
