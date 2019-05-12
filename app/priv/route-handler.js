const ErrorHandler = require('./error-handler');

async function handleModel(ctx, {onData, onError}) {
	let errorObject;
	try {
		let jsonData = await onData();
		if(jsonData) {
			ctx.body = jsonData;
		} else {
			errorObject = onError();
			throw errorObject;
		}
	} catch(err) {
		if(err instanceof Error) {
			ErrorHandler.handle(undefined, {
				err: err
			});
		} else if(errorObject) {
			ErrorHandler.handle(errorObject.code, errorObject.args);
		} else if(onError) {
			errorObject = onError();
			ErrorHandler.handle(errorObject.code, errorObject.args);
		} else {
			ErrorHandler.handle();
		}
	}
}

module.exports = {
	handleModel: handleModel
};
