var express = require('express');
var router = express.Router();

var mailChimpController = require('../controllers/mailchimp');

router.get('/listas', mailChimpController.getAllLists);

router.get('/listas/:id', mailChimpController.getOneList);

router.post('/listas/:id/suscribir', mailChimpController.subscribe)

module.exports = router;
