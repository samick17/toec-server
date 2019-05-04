/*
 * @CreatedDate: 2018/06/16
 * @Author: Samick.Hsu(boneache@gmail.com)
 * @Description: 
 * @ChangeLogs: 
 */
//
(function() {
	const colorMap = {
		Black: '0;30',
		Red: '0;31',
		Green: '0;32',
		Brown: '0;33',
		Blue: '0;34',
		Purple: '0;35',
		Cyan: '0;36',
		LightGray:'0;37',
		DarkGray:'1;30',
		LightRed:'1;31',
		LightGreen: '1;32',
		Yellow: '1;33',
		LightBlue: '1;34',
		LightPurple: '1;35',
		LightCyan: '1;36',
		White: '1;37',
		NoColor: '0'
	};
	function toColorCode(color) {
		var colorCode = '\033['+color+'m';
		return colorCode;
	}
	function toColoredText(text, color) {
		if(color in colorMap) {
			var startColor = toColorCode(colorMap[color]);
			var endColor = toColorCode(colorMap.NoColor);
			return `${startColor}${text}${endColor}`;
		} else {
			return text;
		}
	}
	module.exports = {
		toColorCode: toColorCode,
		toColoredText: toColoredText
	};
})();