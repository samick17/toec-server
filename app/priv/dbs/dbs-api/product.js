function init(seq, APIs) {
	const DataWrapper = require('../utility/data-wrapper');
	const Sequelize = require('sequelize');
	const {
		Customer,
		Product,
		Category,
		Department,
		Review
	} = seq.models;
	function productToJson(product) {
		return DataWrapper.exportData(product, [
			'product_id',
			'name',
			'description',
			'price',
			'discounted_price',
			'image',
			'image_2'
			]);
	}
	function reviewToJson(review) {
		let jsonData =  DataWrapper.exportData(review, [
			'review',
			'rating',
			'created_on'
			]);
		try {
			jsonData.name = review.dataValues.Customer.dataValues.name;
		} catch(err) {
			//do nothing
		}
		return jsonData;
	}
	let api = {
		// page: integer, default: 1
		// limit: integer, default: 20
		// descriptionLength: integer, default 200
		getProducts: async function({page, limit, descriptionLength}={page:1, limit:20, descriptionLength: 200}) {
			let queryOptions = {};
			let actualLimit = queryOptions.limit = limit >= 1 ? limit : 20;
			queryOptions.offset = page >= 1 ? (page-1) * actualLimit : 0;
			let products = await Product.findAll(queryOptions);
			let jsonObjects = [];
			products.forEach(product => {
				if(product.dataValues.description.length <= descriptionLength) {
					jsonObjects.push(product.dataValues);
				}
			});
			return {
				count: jsonObjects.length,
				rows: jsonObjects
			};
		},
		// * queryString: string
		// allWords: string, default: 'on', Enum{'on', 'off'}
		// page: integer, default: 1
		// limit: integer, default: 20
		// descriptionLength: integer, default 200
		searchProducts: async function(queryString, {allWords, page, limit, descriptionLength}={allWords: 'on', page: 1, limit: 20, descriptionLength: 200}) {
			let products = await Product.findAll({
				where: {
					[Sequelize.Op.or]: [
					{
						name: {
							[Sequelize.Op.like]: `% ${queryString} %`
						}
					},
					{
						description: {
							[Sequelize.Op.like]: `% ${queryString} %`
						}
					}
					]
				}
			});
			let jsonObjects = [];
			products.forEach(product => {
				if(product.dataValues.description.length <= descriptionLength) {
					jsonObjects.push(product.dataValues);
				}
			});
			return {
				count: jsonObjects.length,
				rows: jsonObjects
			};
		},
		// * productId: integer
		getProductById: async function(productId) {
			let product = await Product.findOne({
				where: {
					product_id: productId
				}
			});
			if(product) return product.dataValues;
		},
		// * productId: integer
		getProductDetailById: async function(productId) {
			let product = await Product.findOne({
				where: {
					product_id: productId
				}
			});
			if(product) return productToJson(product);
		},
		// * productId: integer
		getProductLocations: async function(productId) {
			let products = await Product.findOne({
				include: [{
					model: Category,
					include: {
						model: Department
					}
				}],
				where: {
					product_id: productId
				}
			});
			return products.dataValues.Categories.map(category => {
				let categoryJsonData = category.dataValues;
				let departmentJsonData = categoryJsonData.Department.dataValues;
				return {
					category_id: categoryJsonData.category_id,
					category_name: categoryJsonData.name,
					department_id: departmentJsonData.department_id,
					department_name: departmentJsonData.name
				};
			});
		},
		// * categoryId: integer
		// page: integer, default: 1
		// limit: integer, default: 20
		// descriptionLength: integer, default 200
		getProductsByCategoryId: async function(categoryId, {page, limit, descriptionLength}={page:1, limit:20, descriptionLength: 200}) {
			let queryOptions = {};
			let actualLimit = queryOptions.limit = limit >= 1 ? limit : 20;
			queryOptions.offset = page >= 1 ? (page-1) * actualLimit : 0;
			Object.assign(queryOptions, {
				include: [{
					model: Category,
					where: {
						category_id: categoryId
					}
				}]
			});
			let products = await Product.findAll(queryOptions);
			let result = {
				count: 0,
				rows: []
			};
			if(products) {
				products.forEach(product => {
					let jsonProduct = product.dataValues;
					if(jsonProduct.description.length <= descriptionLength) {
						let jsonObject = DataWrapper.exportData(product, [
							'product_id',
							'name',
							'description',
							'price',
							'discounted_price',
							'thumbnail'
							]);
						result.rows.push(jsonObject);
					}
				});
				result.count = result.rows.length;
			}
			return result;
		},
		// * departmentId: integer
		// page: integer, default: 1
		// limit: integer, default: 20
		// descriptionLength: integer, default 200
		getProductsByDepartmentId: async function(departmentId, {page, limit, descriptionLength}={page:1, limit:20, descriptionLength: 200}) {
			let queryOptions = {};
			let actualLimit = queryOptions.limit = limit >= 1 ? limit : 20;
			queryOptions.offset = page >= 1 ? (page-1) * actualLimit : 0;
			Object.assign(queryOptions, {
				include: [{
					model: Category,
					include: [{
						model: Department,
						where: {
							department_id: departmentId
						}
					}]
				}]
			});
			let products = await Product.findAll(queryOptions);
			let result = {
				count: 0,
				rows: []
			};
			if(products) {
				products.forEach(product => {
					let jsonProduct = product.dataValues;
					if(jsonProduct.description.length <= descriptionLength) {
						let jsonObject = DataWrapper.exportData(product, [
							'product_id',
							'name',
							'description',
							'price',
							'discounted_price',
							'thumbnail',
							'display'
							]);
						result.rows.push(jsonObject);
					}
				});
				result.count = result.rows.length;
			}
			return result;
		},
		// * productId: integer
		getProductReviewById: async function(productId) {
			let reviews = await Review.findAll({
				where: {
					product_id: productId
				},
				include: [{
					model: Customer
				}]
			});
			return reviews.map(reviewToJson);
		},
		// # Auth required.
		// * productId: integer
		// * review: string # review text of product
		// * rating: integer
		createProductReview: async function(customerId, productId, review, rating) {
			return await Review.create({
				customer_id: customerId,
				product_id: productId,
				review: review,
				rating: rating,
				created_on: Date.now()
			});
		}
	};
	APIs.ProductAPI = api;
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
		// let products = await API.getProducts({
		// 	descriptionLength: 100
		// });
		// console.log(products);
		// let products = await API.searchProducts('ship');
		// console.log(products);
		// let product = await API.getProductById(1);
		// console.log(product);
		//
		// let product = await API.getProductDetailById(1);
		// console.log(product);
		// let locations = await API.getProductLocations(1);
		// console.log(locations);
		// let products = await API.getProductsByCategoryId(1);
		// console.log(products);
		// let products = await API.getProductsByDepartmentId(3);
		// console.log(products);
		// let reviews = await API.getProductReviewById(1);
		// console.log(reviews);
		// let ret = await API.createProductReview(1, 1, 'Testzxczxc - asdsa ', 5);
		// console.log(ret);

	})();
}
