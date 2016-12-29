var User = require('../collections/user');

var uploaderController = require('./uploader');



//by Angel Rodriguez
//
module.exports.concurse = function (req,res) {
  var concurse = req.body.team;
  var participants = req.body.participants;
  for (var i =0; i < req.body["participants_name[]"].length; i++) {

    var user = new User();
    user.first_name = req.body["participants_name[]"][i];
    user.last_name = req.body["participants_lastname[]"][i];
    user.dni = req.body["participants_dni[]"][i];
    user.team = concurse;
    user.save();
  }
  return res.sendStatus(200);
}

//end
//

module.exports.listUsers = function (req,res) {
  User.find({},function (err,users) {
    if(err) return res.sendStatus(503);
    return res.json(users);
  });
}

module.exports.preregister = function(req, res){

    const uploaderOptions = {
      service: 'dropbox', file: req.file
    };

    uploaderController (uploaderOptions)
        .then(params => {
        
            var userData = {};
            userData.voucher = params.file;
            userData.voucherThumb = params.thumbnail;
            userData.first_name = req.body.firstName;
            userData.last_name = req.body.lastName;
            userData.type = req.body.type;
            userData.email = req.body.email;
            userData.phone = req.body.phone;
            userData.city = req.body.city;

            var user = new User(userData)
            return user.save()

        })
        .then(user => res.sendStatus(200))
        .catch(err => res.sendStatus(503))
}
