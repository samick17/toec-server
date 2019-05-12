const APIKey = process.env.TS_API_KEY;
const stripe = require('stripe')(APIKey);

module.exports = {
	stripe: stripe
};
