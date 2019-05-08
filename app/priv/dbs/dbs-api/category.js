function init(seq, APIs) {
	const DataWrapper = require('../utility/data-wrapper');
	const {
		Product,
		Category,
		ProductCategory
	} = seq.models;
	function categoryToJson(attribute) {
		return DataWrapper.exportData(attribute, [
			'category_id',
			'department_id',
			'name'
			]);
	}
	let api = {
		// order: string, Enum{'category_id', 'name'} # sorting a field. 
		// page: integer, default: 1
		// limit: integer, default: 20
		getCategories: async function({order, page, limit}={order:'',page:1,limit:20}) {
			let queryOptions = {};
			let actualLimit = queryOptions.limit = limit >= 1 ? limit : 20;
			queryOptions.offset = page >= 1 ? (page-1) * actualLimit : 0;
			if(order) {
				let orderArray = order.split(',');
				if(orderArray.length === 2 && ['category_id', 'name'].indexOf(orderArray[0]) >= 0
					 && ['ASC', 'DESC'].indexOf(orderArray[1]) >= 0) {
					queryOptions.order = [orderArray];
				}
			}
			let categories = await Category.findAll(queryOptions);
			return categories.map(category => category.dataValues);
		},
		// * categoryId
		getCategoryById: async function(categoryId) {
			let category = await Category.findOne({
				where: {
					category_id: categoryId
				}
			});
			if(category) return category.dataValues;
		},
		// * productId
		getCategoriesOfProduct: async function(productId) {
			let categories = await Category.findAll({
				include: [{
					model: Product,
					where: {
						product_id: productId
					}
				}]
			});
			if(categories) {
				return categories.map(categoryToJson);
			}
		},
		// * departmentId
		getCategoriesOfDepartment: async function(departmentId) {
			let categories = await Category.findAll({
				where: {
					department_id: departmentId
				}
			});
			if(categories) {
				return categories.map(category => category.dataValues);
			}
		}
	};
	APIs.CategoryAPI = api;
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
		// let categories = await API.getCategories({
		// 	order: 'category_id,DESC',
		// 	page: 1,
		// 	limit: 5
		// });
		// console.log(categories);
		// let category = await API.getCategoryById(1);
		// console.log(category);
		let categories = await API.getCategoriesOfProduct(999);
		console.log(categories);
		// let categories = await API.getCategoriesOfDepartment(1);
		// console.log(categories);
	})();
}
