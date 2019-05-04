const DB = require('@DB');
const router = require('express').Router({
	mergeParams: true
});

router.get('/', (req, res) => {
	let seq = DB.getSeq();
	let categories = await seq.models.Category.findAll();
	res.json({
		count: categories.length,
		rows: categories
	});
});

router.post('/:categoryId', (req, res) => {
	res.json({
	});
});

router.post('/inProduct/:productId', (req, res) => {
	res.json({
	});
});

router.post('/inDepartment/:departmentId', (req, res) => {
	res.json({
	});
});

module.exports = router;
