/*
* Query message model - for storing user queries or requests
* attrs -
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var QueryMessageSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    default: ''
  },
  lastName: {
    type: String,
    required: true,
    default: ''
  },
  emailAddress: {
    type: String,
    required: true,
    default: ''
  },
  phone: {
    type: String,
    required: true,
    default: ''
  },
  message: {
    type: String,
    required: true,
    default: ''
  },
  status: {
    type: String,
    default: 'A'
  },
  createdDate: {
    type: Date,
    default: Date.now()
  }
});

QueryMessageSchema.plugin(autoIncrement.plugin, {model: 'Query', field: 'QueryID', startAt: 1});

module.exports = mongoose.model('Query', QueryMessageSchema);
