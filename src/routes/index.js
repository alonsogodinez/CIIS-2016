'use strict';

var express = require('express');
var router = express.Router();
var mailchimp = require('./mailchimp');
var agile = require('./agile');

var mailerController = require('../controllers/mailer');
var userController = require('../controllers/user');
const uploadMiddleware = require('../controllers/uploader').multer;

/* GET home page. */
router.get('/', function(req, res) {
    res.render('index', { title: 'Express' });
});

router.get('/reporte',function(req,res){
    var User = require('../collections/user');
    User.find().then(users => res.render('reporte', {users, layout: false}));

});

router.post('/concurso',userController.concurse);

// router.get('/eliminameuno/:id', function(req, res){
//     var User = require('../collections/user');
//     User.findOne({_id: req.params.id}).exec()
//         .then(function(user){
//             console.log(user);
//             return user.remove()
//         })
//         .then(() => res.redirect('/reporte'))
//         .catch(err => res.sendStatus(503))
// });

router.get('/users/concurso',userController.listUsers);
router.use('/mailchimp', mailchimp);
router.use('/agile',agile)
router.get('/contacto', mailerController.contact)
router.post('/contacto', mailerController.contact)
router.post('/preregistro',uploadMiddleware.single('image'), userController.preregister)

module.exports = router;
