/*
 * @Author: Samick.Hsu
 * @CreatedDate: 2017/08/13
 */
//
(function() {

	const CLIColor = require('./cli-color');

	const SeverityMap = {
		info: '['+CLIColor.toColoredText('info', 'LightCyan')+']',
		warning: '['+CLIColor.toColoredText('warning', 'Yellow')+']',
		error: '['+CLIColor.toColoredText('error', 'LightRed')+']',
	};

	function createLogger(debugMode, name) {
		var tag = name ? `[${name}]` : '';
		function createMsgData(severity, msg) {
			if(msg) {
				var severityName = SeverityMap[severity];
				if (msg instanceof Error) {
					var text = msg.message;
					return `${severityName}${tag} ${text} ${msg.stack}`;
				} else if(typeof msg === 'object') {
					var text = JSON.stringify(msg);
					return `${severityName} ${tag}${text}`;
				} else {
					var text = msg;
					return `${severityName}${tag} ${text}`;
				}
			}
		}
		if(debugMode) {
			return {
				info: function(msg) {
					console.log(createMsgData('info', msg));
				},
				log: function(msg) {
					console.log(createMsgData('info', msg));
				},
				warning: function(msg) {
					console.log(createMsgData('warning', msg));
				},
				error: function(msg) {
					console.log(createMsgData('error', msg));
				},
				getLogger: function(name) {
					if(!name) {
						return this;
					} else {
						return createLogger(true, name);
					}
				}
			};
		} else {
			return {
				info: function(msg) {
				},
				log: function(msg) {
				},
				warning: function(msg) {
				},
				error: function(msg) {
				},
				getLogger: function(name) {
					if(!name) {
						return this;
					} else {
						return createLogger(true, name);
					}
				}
			};
		}
	}
	let DebugMode = process.env.NODE_ENV !== 'production';

	let loggers = {};

	function getLogger(name) {
		let logger = loggers[name];
		if(!logger) {
			logger = createLogger(name);
			loggers[name] = logger;
		}
		return logger;
	}

	module.exports = {
		getLogger: getLogger
	};
})();
