/*
* Course Model - mongoose Schema
* attrs - courseID, courseName, description, categoryID, schedule, scheduleType (recurring / onetime), createDate, modifiedDate
          createdUserID, price, paymentType (payatvenue), amenities
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var CourseSchema = new Schema({
  courseName: {
    type: String,
    required: true,
    default: ''
  },
  description: {
    type: String,
    required: true,
    default: ''
  },
  schedule: {
    type: String,
    required: true,
    default: ''
  },
  scheduleType: {
    type: String,
    required: true,
    default: 'recurring'
  },
  includes: {
    type: String
  },
  startFrom: {
    type: String,
    default: '',
    required: true
  },
  address: {
    type: String,
    required: true,
    default: ''
  },
  languages: {
    type: String,
    required: true
  },
  ratings: {
    type: Number,
    default: 0
  },
  parking: {
    type: []
  },
  imageUrl: {
    type: String,
    default: ''
  },
  contactPerson: {
    type: String,
    default: '',
    required: true
  },
  contactNumber: {
    type: String,
    default: '',
    required: true
  },
  contactEmailAddress: {
    type: String,
    default: '',
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  modifiedDate: {
    type: Date,
    default: Date.now()
  },
  price: {
    type: Number,
    default: 0,
    required: true
  },
  paymentType: {
    type: String,
    default: 'payatvenue'
  },
  amenities: {
    type: String,
    default: ''
  },
  status: {
    type: String,
    default: 'A'
  },
  categoryID: { type: Schema.Types.ObjectId, ref: 'Category' },
  createdUserID: { type: Schema.Types.ObjectId, ref: 'User' }
});

CourseSchema.plugin(autoIncrement.plugin, { model: 'Course', field: 'courseID', startAt: 1 });

module.exports = mongoose.model('Course', CourseSchema);
