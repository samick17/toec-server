const DB = require('@DB');
const router = require('koa-router')();
const ShoppingCartError = require('@Priv/error/shopping-cart');
const ErrorHandler = require('@Priv/error-handler');
const RouteHandler = require('@Priv/route-handler');
const Validator = require('@Priv/validator');

router.get('/generateUniqueId', async (ctx) => {
	if(typeof ctx.session.cartId !== 'undefined') {
		ctx.body = {
			cart_id: ctx.session.cartId
		};
	} else {
		let APIs = DB.getAPIs();
		let newId = await APIs.ShoppingCartAPI.generateUniqueId();
		ctx.session.cartId = newId;
		ctx.body = {
			cart_id: newId
		};
	}
});

router.post('/add', async (ctx) => {
	let {
		cart_id,
		product_id,
		attributes
	} = ctx.request.body;
	product_id = parseInt(product_id);
	Validator.requireArgs({
		cart_id, product_id, attributes
	}, ShoppingCartError, 'FieldsRequired');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShoppingCartAPI.addProductToCart(cart_id, product_id, attributes);
	ctx.body = jsonData;
});

router.get('/:cartId', async (ctx) => {
	let {
		cartId
	} = ctx.params;
	Validator.requireArgs({
		cartId
	}, ShoppingCartError, 'FieldsRequired');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShoppingCartAPI.getCartById(cartId, {
		withProductId: true,
		withImage: true
	});
	ctx.body = jsonData;
});

router.put('/update/:itemId', async (ctx) => {
	let {
		quantity
	} = ctx.request.body;
	let {
		itemId
	} = ctx.params;
	itemId = parseInt(itemId);
	Validator.validateInteger(itemId, ShoppingCartError, 'ItemIDNotNumber');
	Validator.validateInteger(quantity, ShoppingCartError, 'QuantityNotNumber');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShoppingCartAPI.updateCartById(itemId, quantity);
	ctx.body = jsonData;
});

router.delete('/empty/:cartId', async (ctx) => {
	let {
		cartId
	} = ctx.params;
	Validator.requireArgs({
		cartId
	}, ShoppingCartError, 'FieldsRequired');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShoppingCartAPI.emptyCart(cartId);
	ctx.body = jsonData;
});

router.get('/moveToCart/:itemId', async (ctx) => {
	// TODO get cartId by session
	let cartId = '';
	let {
		itemId
	} = ctx.params;
	itemId = parseInt(itemId);
	Validator.validateInteger(itemId, ShoppingCartError, 'ItemIDNotNumber');
	let APIs = DB.getAPIs();
	let newId = await APIs.ShoppingCartAPI.moveProductToCart(itemId, cartId);
	ctx.body = '';
});

router.get('/totalAmount/:cartId', async (ctx) => {
	let {
		cartId
	} = ctx.params;
	Validator.requireArgs({
		cartId
	}, ShoppingCartError, 'FieldsRequired');
	let APIs = DB.getAPIs();
	let jsonData = await APIs.ShoppingCartAPI.getAmountOfCart(cartId);
	ctx.body = jsonData;
});

// Save to new cart
router.get('/saveForLater/:itemId', async (ctx) => {
	let {
		itemId
	} = ctx.params;
	itemId = parseInt(itemId);
	console.log(`ItemId: "${itemId}"`);
	Validator.validateInteger(itemId, ShoppingCartError, 'ItemIDNotNumber');
	ctx.body = {};
});

// Get saved by cartId
router.get('/getSaved/:cartId', async (ctx) => {
	let {
		cartId
	} = ctx.params;
	Validator.requireArgs({
		cartId
	}, ShoppingCartError, 'FieldsRequired');
	ctx.body = {};
});

router.delete('/removeProduct/:itemId', async (ctx) => {
	let {
		itemId
	} = ctx.params;
	itemId = parseInt(itemId);
	Validator.validateInteger(itemId, ShoppingCartError, 'ItemIDNotNumber');
	let APIs = DB.getAPIs();
	let newId = await APIs.ShoppingCartAPI.removeProductFromCart(itemId);
	ctx.body = '';
});

module.exports = router;
