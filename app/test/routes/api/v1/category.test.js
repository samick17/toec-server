const request = require('supertest');
const {assert} = require('chai');
const Env = require('@Env');
const DB = require('@DB');
const App = require('@App');

describe('category', () => {

	let app;
	// let seq;

	beforeEach(async () => {
		await DB.init();
		app = App.createApp();
	});

	afterEach(async () => {
		await DB.close();
	});

	// it('get /', () => {
	// 	// request(app)
	// 	// .get('/categories')
	// 	// .end((err, res) => {
	// 	// 	console.log(res.body.count);
	// 	// 	// assert.equal(res.body, {
	// 	// 	// 	count: 7,
	// 	// 	// 	rows: []
	// 	// 	// });
	// 	// });
	// });

	// it('get /:categoryId', () => {
	// 	request(app)
	// 	.get('/categories/9999')
	// 	.end((err, res) => {
	// 		console.log(res.body);
	// 		// assert.equal(res.body, {
	// 		// 	count: 7,
	// 		// 	rows: []
	// 		// });
	// 	});
	// });

	it('get /inProduct/:productId', () => {
		// request(app)
		// .get('/categories/inProduct/1')
		// .end((err, res) => {
		// 	console.log(res.body);
		// 	// assert.equal(res.body, {
		// 	// 	count: 7,
		// 	// 	rows: []
		// 	// });
		// });
	});

	it('get /inDepartment/:departmentId', () => {
		// request(app)
		// .get('/categories/inDepartment/1')
		// .end((err, res) => {
		// 	console.log(res.body);
		// 	// assert.equal(res.body, {
		// 	// 	count: 7,
		// 	// 	rows: []
		// 	// });
		// });
	});

});
