var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
	res.render('demo', {title: 'Express', name: '鹏飞', A: "", B: ""});
	// res.render('demo', {title: 'Express', name: '鹏飞'});
});

// router.get('/other', function (req, res, next) {
//     res.render('demo', {A: 'Express2', B: '鹏飞2'});
// });

router.get('/booknames', function (req, res, next) {
	var booknames = ['react guid', 'mysql guid', 'mongo quick start'];
	res.send(booknames);
});

router.get('/newbooks', function (req, res, next) {
	var booknames = ['react guid', 'mysql guid', 'mongo quick start'];
	booknames.push(new Date().toLocaleString());
	booknames.push(process.version);
	res.send(booknames);
});

module.exports = router;
