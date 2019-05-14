const {assert} = require('chai');
const Validator = require('@Priv/validator');

describe('auth', () => {

	it('requireArgs', async () => {
		Validator.requireArgs({
			name: '123',
			age: 18,
			dep: 'Business'
		});
		try {
			Validator.requireArgs({
				name: '123',
				age: undefined,
				dep: null
			}, {
				FieldsRequired: {
					code: '0x0001',
					message: 'Fields "${fields}" is required!'
				}
			}, 'FieldsRequired');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Fields "age, dep" is required!');
		}
	});

	it('validateEmail', async () => {
		Validator.validateEmail('ggg@ggg.com');
		try {
			Validator.validateEmail('ggg@@ggg.com', {
				InvalidEmailFormat: {
					code: '0x0001',
					message: 'Email ${email} is invalid'
				}
			});
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Email ggg@@ggg.com is invalid');
		}
		try {
			Validator.validateEmail('gggggg.com', {
				InvalidEmailFormat: {
					code: '0x0001',
					message: 'Email ${email} is invalid'
				}
			});
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Email gggggg.com is invalid');
		}
		try {
			Validator.validateEmail('ggg@gg', {
				InvalidEmailFormat: {
					code: '0x0001',
					message: 'Email ${email} is invalid'
				}
			});
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Email ggg@gg is invalid');
		}
	});

	it('validatePhoneNumber', async () => {

	});

	it('validateCreditCard', async () => {});

	it('validateInteger', async () => {
		Validator.validateInteger(9);
		try {
			Validator.validateInteger('', {
				IDNotNumber: {
					code: '0x0001',
					message: 'Id should be a number'
				}
			}, 'IDNotNumber');
			assert.fail('Error not raised');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Id should be a number');
		}
		try {
			Validator.validateInteger(NaN, {
				IDNotNumber: {
					code: '0x0001',
					message: 'Id should be a number'
				}
			}, 'IDNotNumber');
			assert.fail('Error not raised');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Id should be a number');
		}
	});

	it('validateIntegerRange', async () => {
		Validator.validateInteger(9, 0, 100);
		try {
			Validator.validateIntegerRange('', 0, 100, {
				IDNotNumber: {
					code: '0x0001',
					message: 'Id should be a number'
				}
			}, 'IDNotNumber', 'NumberOutOfRange');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Id should be a number');
		}
		try {
			Validator.validateIntegerRange(101, 0, 100, {
				NumberOutOfRange: {
					code: '0x0002',
					message: 'Id out of range'
				}
			}, 'IDNotNumber', 'NumberOutOfRange');
		} catch(err) {
			assert.equal(err.code, '0x0002');
			assert.equal(err.message, 'Id out of range');
		}
	});

	it('validateStrEnum', async () => {
		Validator.validateStrEnum('on', ['off', 'on']);
		try {
			Validator.validateStrEnum('abc', ['off', 'on'], {
				InvalidElement: {
					code: '0x0001',
					message: 'No matched element'
				}
			}, 'InvalidElement');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'No matched element');
		}
	});

	it('validateStr', async () => {
		Validator.validateStr('on');
		try {
			Validator.validateStr(123, {
				NotString: {
					code: '0x0001',
					message: 'Value is not a string'
				}
			}, 'NotString');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Value is not a string');
		}
	});

	it('validateStrLenRange', async () => {
		Validator.validateStrLenRange('ab', 4, 10);
		try {
			Validator.validateStrLenRange(100, 4, 10, {
				NotString: {
					code: '0x0001',
					message: 'Value is not a string'
				}
			}, 'NotString');
		} catch(err) {
			assert.equal(err.code, '0x0001');
			assert.equal(err.message, 'Value is not a string');
		}
		try {
			Validator.validateStrLenRange('abcde', 4, 10, {
				LenOfStringOutOfRange: {
					code: '0x0002',
					message: 'Len of string out of range'
				}
			}, 'NotString', 'LenOfStringOutOfRange');
		} catch(err) {
			assert.equal(err.code, '0x0002');
			assert.equal(err.message, 'Len of string out of range');
		}
	});
});
