/*
* Activity module - Mongoose Schema
* attrs - activityID, activityName, description, categoryID {ref: Category}, schedule, scheduleType (recurring / onetime)
          createDate, modifiedDate, createdUserID, price, paymentType (payAtVenue), amenities
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var ActivitySchema = new Schema({
  activityName: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  schedule: {
    type: Date,
    required: true
  },
  scheduleType: {
    type: String,
    default: 'onetime'
  },
  price: {
    type: Number,
    required: true,
    default: 0
  },
  address: {
    type: String,
    required: true
  },
  languages: {
    type: String,
    required: true
  },
  parking: {
    type: []
  },
  imageUrl: {
    type: String,
    default: ''
  },
  paymentType: {
    type: String,
    default: 'payatvenue'
  },
  amenities: {
    type: String,
    default: ''
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  modifiedDate: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default: 'A'
  },
  includes: {
    type: String
  },
  duration: {
    type: String,
    default: '1 Hour'
  },
  categoryID: {type: Schema.Types.ObjectId, ref: 'Category'},
  creadtedUserID: {type: Schema.Types.ObjectId, ref: 'User'}
});

ActivitySchema.plugin(autoIncrement.plugin, {model: 'Activity', field: 'activityID', startAt: 1});

module.exports = mongoose.model('Activity', ActivitySchema);
