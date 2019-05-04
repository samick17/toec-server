const router = require('express').Router({
	mergeParams: true
});

router.get('/', (req, res) => {
	res.json({
	});
});

router.post('/:departmentId', (req, res) => {
	res.json({
	});
});

module.exports = router;
