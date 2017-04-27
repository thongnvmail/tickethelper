var express = require('express');
var router = express.Router();
var bookingHelperController = require('../controller/bookingHelperController');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('booking-helper', { title: 'Lich hen' });
});

/** Load all request */
router.get('/getRequest', bookingHelperController.getRequests);
/** Find new requests */
router.get('/findNewRequest', bookingHelperController.findNewRequest);
/** Find new requests */
router.get('/getRequest/:id', bookingHelperController.loadRequest);

module.exports = router;