function fmt(text, args) {
	return text.replace(/\${(.*?)}/g, (_i, j) => {
		return args[j];
	});
}

const ErrorCodes = {
	NotFound: {
		status: 400,
		code: '0x00001',
		message: '${name} not found.'
	},
	Unhandled: {
		status: 500,
		code: '0x99999',
		message: 'Unhandled error'
	}
};

class CustomError extends Error {
	constructor(code, message) {
		super(message);
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

function handle(errorKey, args) {
	let errCodeData = ErrorCodes[errorKey] || ErrorCodes.Unhandled;
	throw new CustomError(errCodeData.code, fmt(errCodeData.message, args));
}

module.exports = {
	handle: handle
};
