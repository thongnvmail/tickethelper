var express = require('express');
var router = express.Router();
var bookingHelperController = require('../controller/bookingHelperController');
// var carController = require('../controller/carController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('booking-helper', { title: 'Lich hen' });
});

/** Load all request */
router.get('/request', bookingHelperController.getRequests);
/** Find new requests */
router.get('/findNewRequest', bookingHelperController.findNewRequest);
/** Find new requests */
router.get('/request/:id', bookingHelperController.loadRequest);

/** Add book */
router.post('/request', bookingHelperController.addRequest);

/** Put book */
router.put('/request/:id', bookingHelperController.putBook);

/** Find one one */
router.post('/car', bookingHelperController.postIdCar);

module.exports = router;