const router = require('express').Router({
	mergeParams: true
});

router.get('/', (req, res) => {
	res.json({
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
