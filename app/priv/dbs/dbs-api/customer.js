function init(seq, APIs) {
	const Encryptor = require('../utility/encryptor');
	const DataWrapper = require('../utility/data-wrapper');
	const Customer = seq.models.Customer;

	function customerToJson(customer) {
		return DataWrapper.exportData(customer.dataValues, [
			'customer_id',
			'name',
			'email',
			'credit_card',
			'address_1',
			'address_2',
			'city',
			'region',
			'postal_code',
			'country',
			'shipping_region_id',
			'day_phone',
			'eve_phone',
			'mob_phone'
			]);
	}

	let api = {
		// # Auth required.
		// * name
		// * customerId
		// * email
		updateProfile: async function(customerId, name, email, {password, day_phone, eve_phone, mob_phone}={}) {
			let newData = {
				name: name,
				email: email,
			};
			if(typeof password === 'string') newData.password = await Encryptor.encrypt(password);
			if(typeof day_phone === 'string') newData.day_phone = day_phone;
			if(typeof eve_phone === 'string') newData.eve_phone = eve_phone;
			if(typeof mob_phone === 'string') newData.mob_phone = mob_phone;
			await Customer.update(newData, {
				where: {
					customer_id: customerId
				}
			});
			return await this.getCustomerById(customerId);
		},
		// # Auth required.
		// * customerId
		getCustomerById: async function(customerId) {
			let customer = await Customer.findOne({
				where: {
					customer_id: customerId
				}
			});
			if(customer) {
				return customerToJson(customer);
			}
		},
		countOfEmail: async function(email) {
			return await Customer.count({
				where: {
					email: email
				}
			});
		},
		// * name
		// * email
		// * password
		/*
		{
		  "customer": {
		    "customer_id": 5661,
		    "name": "samick",
		    "email": "ggg2@google.com",
		    "address_1": null,
		    "address_2": null,
		    "city": null,
		    "region": null,
		    "postal_code": null,
		    "country": "",
		    "shipping_region_id": 1,
		    "credit_card": null,
		    "day_phone": null,
		    "eve_phone": null,
		    "mob_phone": null
		  },
		  "accessToken": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJjdXN0b21lcl9pZCI6NTY2MSwibmFtZSI6InNhbWljayIsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTU1Njg3NDU3NiwiZXhwIjoxNTU2OTYwOTc2fQ.bTyuKjqzMkgQHvDDm7spMHjMGooXInGNP2v4a-y0PYI",
		  "expires_in": "24h"
		}
		*/
		register: async function(name, email, password) {
			let encryptedPwd = await Encryptor.encrypt(password);
			let customer = await Customer.create({
				name: name,
				email: email,
				password: encryptedPwd
			});
			return customerToJson(customer);
		},
		// return customerJson if valid
		auth: async function(email, password) {
			let encryptedPwd = await Encryptor.encrypt(password);
			let customer = await Customer.findOne({
				where: {
					email: email
				}
			});
			if(customer) {
				let isAuthenticated = customer.dataValues.password === encryptedPwd;
				if(isAuthenticated) {
					return customerToJson(customer);
				}
			}
		},
		// # Auth required.
		// * address_1
		// * city
		// * region
		// * postal_code
		// * country
		// * shipping_region_id
		updateAddress: async function(customerId, address1, city, region, postalCode, country, shippingRegionId) {
			await Customer.update({
				address_1: address1,
				city: city,
				region: region,
				postal_code: postalCode,
				country: country,
				shipping_region_id: shippingRegionId
			}, {
				where: {
					customer_id: customerId
				}
			});
			return await this.getCustomerById(customerId);
		},
		// # Auth required.
		// * creditCard
		updateCreditCard: async function(customerId, creditCard) {
			await Customer.update({
				credit_card: creditCard
			}, {
				where: {
					customer_id: customerId
				}
			});
			return await this.getCustomerById(customerId);
		}
	};
	APIs.CustomerAPI = api;
	return api;
}

module.exports = {
	init: init
};

if(module.id === '.') {
	const DBWrapper = require('../db-wrapper');
	const SetupEnv = require('../utility/setup-env');
	(async () => {
		SetupEnv.init();
		const seq = await DBWrapper.init();
		let API = init(seq, {});
		// let customer = await API.updateProfile(15)
		// console.log(customer);
		// let customer = await API.getCustomerById(1);
		// console.log(customer);
		let customer = await API.auth('ggg1@google.com', 'abcd1234');
		console.log(customer);
		// let customer = await API.register('samick', 'ggg1@google.com', 'abcd1234');
		// console.log(customer);
		// let customer = await API.updateAddress(15, 'dfgfg');
		// console.log(customer);
		// let customer = await API.updateCreditCard(15, 'dfgdfgfddfgdfgdf');
		// console.log(customer);
	})();
}
