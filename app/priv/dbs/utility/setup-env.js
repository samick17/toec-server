function init(config) {
	if(!config) {
		const path = require('path');
		let configPath = path.join(__dirname, '../../../env/index');
		config = require(configPath);
	} else {
		Object.assign(process.env, config);	
	}
}

module.exports = {
	init: init
};
