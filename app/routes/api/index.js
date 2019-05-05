/*
 * @CreatedDate: 2018/08/24
 * @Author: Samick.Hsu(boneache@gmail.com)
 */
//
const router = require('express').Router({
	mergeParams: true
});

const ExportedAPIPath = '';
// `/${APIVersion}`
const APIVersion = 'v1';

const allowedOrigins = [
	'http://127.0.0.1:63999',
	'http://localhost:63999'
];

router.use(ExportedAPIPath, (req, res, next) => {
	let origin = req.headers.origin;
	if(allowedOrigins.indexOf(origin) >= 0) {
		res.header('Access-Control-Allow-Origin', origin);
	}
	res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
	res.header('Access-Control-Allow-Credentials', true);
	next();
}, require(`./${APIVersion}`));

module.exports = router;
