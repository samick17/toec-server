function exportData(object, fields) {
	return fields.reduce((m, i) => {
		m[i] = object[i];
		return m;
	}, {});
}

module.exports = {
	exportData: exportData
};
