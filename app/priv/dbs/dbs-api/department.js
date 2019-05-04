function init(seq, APIs) {
	const Department = seq.models.Department;
	let api = {
		getDepartments: async function() {
			let departments = await Department.findAll();
			return departments.map(department => department.dataValues);
		},
		// * departmentId
		getDepartmentById: async function(departmentId) {
			let department = await Department.findOne({
				where: {
					department_id: departmentId
				}
			});
			if(department) return department.dataValues;
		}
	};
	APIs.DepartmentAPI = api;
	return api;
}

module.exports = {
	init: init
};

if(module.id === '.') {
	const DBWrapper = require('../db-wrapper');
	(async () => {
		const seq = await DBWrapper.init();
		let API = init(seq, {});
		// let departments = await API.getDepartments();
		// console.log(departments);
		let department = await API.getDepartmentById(4);
		console.log(department);
	})();
}
