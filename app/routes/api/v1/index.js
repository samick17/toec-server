const router = require('express').Router({
	mergeParams: true
});

router.use('/categories', require('./category'));
router.use('/departments', require('./department'));
// TODO
// router.use('/attributes', require('./attribute'));
// router.use('/products', require('./product'));
// router.use('/customer', require('./customer'));
// router.use('/customers', require('./customers'));
// router.use('/orders', require('./orders'));
// router.use('/shoppingcart', require('./shoppingcart'));
// router.use('/tax', require('./tax'));
// router.use('/shipping', require('./shipping'));
// router.use('/stripe', require('./stripe'));

module.exports = router;
