/*
* Booking model - Mongoose Schema
* attr - bookingId, bookingreference, count, userID, userID, createDate, status (A / C), modifiedDate
*/
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var BookingSchema = new Schema({
  bookingType: {
    type: String,
    required: true
  },
  bookingReference: {
    type: String,
    required: true,
    default: ''
  },
  count: {
    type: Number,
    default: 1
  },
  status: {
    type: String,
    default: 'A'
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  modifiedDate: {
    type: Date,
    default: Date.now()
  },
  userID: { type: Schema.Types.ObjectId, ref: 'User'}
});

BookingSchema.plugin(autoIncrement.plugin, { model: 'Booking', field: 'bookingID', startAt: 1 });

module.exports = mongoose.model('Booking', BookingSchema);
