function init(config) {
	config = config || require('../config.js');
	Object.assign(process.env, config);	
}

module.exports = {
	init: init
};
