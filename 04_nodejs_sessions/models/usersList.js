var mongoose = require('../db/mongoose');

var Schema = mongoose.Schema;

var schema = new Schema({
  login: {
    type: String,
    trim: true,
    required: 'Login is required'
  },
  password: {
    type: String,
    trim: true,
    required: 'Password is required'
  },
  role: String
});

schema.set('toJSON', {
  transform: function(doc, ret, options){
    ret.id = doc._id;
    delete ret._id;
    delete ret.__v;
  }
});

exports.UsersList = mongoose.model('UsersList', schema);