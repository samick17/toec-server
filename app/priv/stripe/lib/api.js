function create(stripe) {
	function delegateStripe(category, fnName, args=[]) {
		return new Promise((resolve, reject) => {
			let target = stripe[category];
			return target[fnName].apply(target, args.concat([(err, data) => {
				err ? reject(err) : resolve(data);
			}]));
		});
	}
	function reqCharge(fnName, args) {
		return delegateStripe('charges', fnName, args);
	}
	function reqCustomer(fnName, args) {
		return delegateStripe('customers', fnName, args);
	}
	function reqToken(fnName, args) {
		return delegateStripe('tokens', fnName, args);
	}
	function createCustomer({description, metadata}={}) {
		return reqCustomer('create', [{
		  description: description,
		  metadata: metadata
		}]);
	}
	function updateCustomer(customerId, {description, metadata}={}) {
		return reqCustomer('update', [customerId, {
		  description: description,
		  metadata: metadata
		}]);
	}
	function retrieveCustomer(customerId) {
		return reqCustomer('retrieve', [customerId]);
	}
	function removeCustomer(customerId) {
		return reqCustomer('del', [customerId]);
	}
	function listCustomers(opts={}) {
		return reqCustomer('list', [opts]);
	}
	function createCardToken(card, {customer}={}) {
		return reqToken('create', [{
		  card,
		  customer
		}]);
	}
	function retrieveToken(tokenId) {
		return reqToken('retrieve', [tokenId]);
	}
	function createCharge({amount, currency, source, description, metadata, receipt_email, customerId}={}) {
		return reqCharge('create', [{
			amount,
			currency,
			source: source,
			description,
			metadata,
			receipt_email,
			customer: customerId
		}]);
	}
	function retrieveCharge(chargeId) {
		return reqCharge('retrieve', [chargeId]);
	}
	return {
		createCustomer,
		retrieveCustomer,
		removeCustomer,
		listCustomers,
		createCardToken,
		retrieveToken,
		createCharge,
		retrieveCharge
	};
}

module.exports = {
	create
};
