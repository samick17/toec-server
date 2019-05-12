const ErrorHandler = require('./error-handler');

const reEmail = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function requireArgs(object, errorCodes, errorKey) {
	let fields = [];
	for(let key in object) {
		let value = object[key];
		if(typeof value === 'undefined' || value === null) {
			fields.push(key);
		}
	}
	if(fields.length > 0) {
		ErrorHandler.handle(errorCodes[errorKey], {
			fields: fields.join(', ')
		});
	}
}

function isInt(num) {
	return Number(num) === num && num %1 === 0;
}

function validateEmail(email, errorCodes, errorKey) {
	if(!reEmail.exec(email)) {
		ErrorHandler.handle(errorCodes[errorKey || 'InvalidEmailFormat'], {
			email: email
		});
	}
}

function validatePhoneNumber(phoneNumber) {

}

function validateCreditCard(creditCard) {

}

function validateInteger(num, errorCodes, errorKey) {
	if(typeof num !== 'number' && isInt(num)) {
		ErrorHandler.handle(errorCodes[errorKey || 'NotNumber']);
	}
}

function validateIntegerRange(num, from, to, errorCodes, errorKey1, errorKey2) {
	validateInteger(num, errorCodes, errorKey1);
	if(num < from && num > to) {
		ErrorHandler.handle(errorCodes[errorKey2]);
	}
}

function validateStrEnum(str, array, errorCodes, errorKey1) {
	if(array.indexOf(str) < 0) {
		ErrorHandler.handle(errorCodes[errorKey1]);
	}
}

function validateStr(str, errorCodes, errorKey) {
	if(typeof str !== 'string') {
		ErrorHandler.handle(errorCodes[errorKey]);
	}
}

function validateStrLenRange(str, from, to, errorCodes, errorKey1, errorKey2) {
	validateStr(str, errorCodes, errorKey1);
	let strLen = str.length;
	if(strLen < from && strLen > to) {
		ErrorHandler.handle(errorCodes[errorKey2]);
	}
}

module.exports = {
	requireArgs: requireArgs,
	validateEmail: validateEmail,
	validatePhoneNumber: validatePhoneNumber,
	validateCreditCard: validateCreditCard,
	validateInteger: validateInteger,
	validateIntegerRange: validateIntegerRange,
	validateStrEnum: validateStrEnum,
	validateStr: validateStr,
	validateStrLenRange: validateStrLenRange
};
