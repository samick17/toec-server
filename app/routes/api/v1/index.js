const router = require('koa-router')();

router.use('/categories', require('./category').routes());
router.use('/departments', require('./department').routes());
router.use('/attributes', require('./attribute').routes());
router.use('/products', require('./product').routes());
router.use('/customer', require('./customer').routes());
router.use('/customers', require('./customers').routes());
router.use('/orders', require('./orders').routes());
router.use('/shoppingcart', require('./shoppingcart').routes());
router.use('/tax', require('./tax').routes());
router.use('/shipping', require('./shipping').routes());
router.use('/stripe', require('./stripe').routes());

module.exports = router;
