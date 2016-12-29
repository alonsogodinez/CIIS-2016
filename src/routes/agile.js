var express = require('express');
var router = express.Router();

var agileController = require('../controllers/agile');

router.get('/', agileController.indexView);
router.post('/preregistro', agileController.preregister);
router.get('/muestrametodos', agileController.list);
router.get('/eliminameuno/:id', agileController.removeUser);



module.exports = router;
