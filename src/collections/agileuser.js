'use strict';

const mongoose = require ('mongoose');

const userSchema = mongoose.Schema ({
  first_name: String,
  last_name: String,
  tipo: String,
  email: String,
  phone: String,
  city: String

});


module.exports = mongoose.model ('AgileUser', userSchema);