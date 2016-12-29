'use strict';

const mongoose = require ('mongoose');

const userSchema = mongoose.Schema ({
  first_name: String,
  last_name: String,
  type: String,
  email: String,
  phone: String,
  city: String,
  voucher:String,
  voucherThumb: String,
  image:String,
  imageThumb: String,
  team:String,
  dni:String
});


module.exports = mongoose.model ('User', userSchema);
