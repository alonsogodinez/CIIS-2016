
var User =  require('../collections/agileuser');

module.exports.indexView = function(req, res){
    res.render('agile/main', {layout: false});
}


module.exports.preregister = function(req, res){
    var user = new User(req.body);
    user.save()
    .then(function(){
        res.sendStatus(200);
    })
    .catch(function(err){
        res.sendStatus(503)
    })
}


module.exports.list = function(req, res){
    User.find().exec()
        .then(function(users){
         res.render('agile/list',{assistant:users, layout: false});
        })
        .catch(function(err){
            res.sendStatus(503)
        })
}

//Use under your responsibility xD
module.exports.removeUser = function(req, res){
    User.findOne({_id: req.params.id}).exec()
        .then(function(user){
            console.log(user);
            return user.remove()
        })
        .then(() => res.redirect('/agile/muestrametodos'))
        .catch(err => res.sendStatus(503))
}