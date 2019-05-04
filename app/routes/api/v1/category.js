const DB = require('@DB');
const router = require('express').Router({
	mergeParams: true
});

router.get('/', async (req, res) => {
	let seq = DB.getSeq();
	let categories = await seq.models.Category.findAll();
	res.json({
		count: categories.length,
		rows: categories
	});
});

router.get('/:categoryId', (req, res) => {
	res.json({
	});
});

router.get('/inProduct/:productId', (req, res) => {
	res.json({
	});
});

router.get('/inDepartment/:departmentId', (req, res) => {
	res.json({
	});
});

module.exports = router;
