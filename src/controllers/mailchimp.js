
module.exports.getAllLists = function (req, res){
  mc.lists.list({}, function(response) {
    res.send({lists: response.data });
  });
}

module.exports.getOneList = function (req, res){

  //get list
  mc.lists.list({filters:{list_id: req.params.id}}, function(listInfo) {

    if(!listInfo) return res.sendStatus(404)

    var list = listInfo.data[0];

    var cb = {

      success: function (subscribersInfo) {

        res.send({ list: list, subscribers :subscribersInfo.data });
      },

      error: function (error) {

        if (error.name == "List_DoesNotExist") return res.status(404).send('la lista no existe')
        if (error.error) return res.status(error.code).send(error.error);
        if (!error.error) return res.status(503).send('error desconocido')
        res.redirect('/listas');
      }
    }

    //get members of list
    mc.lists.members({ id: req.params.id}, cb.success, cb.error);

  });
}

module.exports.subscribe = function (req, res){
  var cb = {

    success: function(data) {
      res.json({email:data.email, FNAME:data.firstName, LNAME:data.lastName})
    },

    error: function(error) {
      if (error.error)  return res.status(error.code).send(error.error);
      res.sendStatus(503);
    }
  }

  mc.lists.subscribe({id: req.params.id, email:{email:req.body.email}}, cb.success, cb.error);
}
