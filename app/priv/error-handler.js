const ErrorCodes = require('./error');

function fmt(text, args) {
	return text.replace(/\${(.*?)}/g, (_i, j) => {
		return args[j];
	});
}

class CustomError extends Error {
	constructor(code, message, status) {
		super(message);
		this.status = status;
		this.code = code;
	}

	toString() {
		return `[CustomError:${this.code}] ${this.message}`;
	}

	toJson() {
		return {
			code: this.code,
			message: this.message
		};
	}

	print() {
		console.log(this.toString());
		console.log(this.stack);
	}
}

function handle(errCodeData, args) {
	errCodeData = errCodeData || ErrorCodes.Default.Unhandled;
	throw new CustomError(errCodeData.code, fmt(errCodeData.message, args || {}), 400);
}

module.exports = {
	handle: handle
};
