var carService = require('../services/db/car');

exports.postIdCar = function (req, res) {
	var carId = req.body.id;
    carService.fetchOne(carId).then(function(car) {
		console.log('Car: ' + JSON.stringify(car));
		var doc = {};
		if(car) {
			doc = car;
		}
		res.json(doc);
		res.status(200).end();

		// var http = require("http");

		// var options = {
		// 	hostname: 'https://gk2s-fb-bot3.herokuapp.com/bot/informAccepted',
		// 	port: 80,
		// 	path: '/',
		// 	method: 'POST',
		// 	headers: {
		// 		'Content-Type': 'application/json',
		// 	}
		// };
		// var req = http.request(options, function(res) {
		// 	console.log('Status: ' + res.statusCode);
		// 	console.log('Headers: ' + JSON.stringify(res.headers));
		// 	res.setEncoding('utf8');
		// 	res.on('data', function (body) {
		// 		console.log('Body: ' + body);
		// 	});
		// });
		// req.on('error', function(e) {
		// 	console.log('problem with request: ' + e.message);
		// });

		// req.write(car);
		// req.end();
	})
	.catch(function(err) {
		console.log('NO_CONTENT');
		res.status(404).end();
	});
}