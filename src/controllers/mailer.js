var nodemailer = require('nodemailer');

var smtpTransport = require('nodemailer-smtp-transport');

var transporter = nodemailer.createTransport(smtpTransport({
    service: 'gmail',
    auth: {
        user: 'esistacna@gmail.com', // my mail
        pass: $config.email.password
    }
}));






module.exports.contact = function(req,res){

  var email = req.body.email;
  var name = req.body.name;
  var subject = req.body.subject;
  var mailOptions = {
    from: name + ' ' + email, // sender address
    to: 'contacto@ciistacna.org', // list of receivers
    subject: 'Consultas: ' + email, // Subject line
    text: subject // plaintext body
  };

  transporter.sendMail(mailOptions, function(error, info){
    if(error){
       console.log(error);
        return res.sendStatus(503);

    }
    console.log('Message sent: ' + info.response);
    res.send();
  });



}
