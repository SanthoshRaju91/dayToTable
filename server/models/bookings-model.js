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
  reference: {
    type: String,
    required: true
  },
  bookingReference: {
    type: Number,
    required: true,
    default: 0
  },
  totalPrice: {
    type: Number,
    required: true,
    default: 0
  },
  adultCount: {
    type: Number,
    default: 0
  },
  childrenCount: {
    type: Number,
    default: 0
  },
  count: {
    type: Number,
    default: 1
  },
  specifiedDate: {
    type: Date
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
