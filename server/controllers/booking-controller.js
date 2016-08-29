/**
* Booking controller for bookings model , business logic
* @methods:
*/

var _ = require('lodash');
var moment = require('moment');
var Booking = require('../models/bookings-model');
var Course = require('../models/courses-model');
var Activity = require('../models/activities-model');
var User = require('../models/user-model');
var Category = require('../models/category-model');
var logger = require('../utils/logUtil').logger;

function getBookingsList(bookings, callback) {
  var bookingList = [];
  _.forEach(bookings, function(value) {
    if(value.bookingType == 'activity') {
      Activity.findOne({activityID: parseInt(value.bookingReference)}, function(err, activity) {
        if(err) {
          logger.error('getBookingsList: Error in fetching bookings list: ' + err);
          callback(false, null);
        } else {
          if(activity.scheduleType === 'onetime') {
            activity['activityStatus'] = (moment() > moment.unix(value.schedule) && value.scheduleType === 'onetime') ? 'Closed' : 'Open';
            activity.schedule = moment.unix(activity.schedule).format('YYYY-MM-DD HH:mm');
            value.item = activity;
            bookingList.push(value);
          } else {
            value.item = activity;
            bookingList.push(value);
          }
          callback(true, bookingList);
        }
      });
    } else if(value.type === 'course') {

    }
  });
}

module.exports = {

  /**
  * Funciton to add bookings from the user
  * @method: addBookingFromUser
  */
  addBookingFromUser: function(req, res) {
    User.findOne({userID: req.body.userID}, function(err, user) {
      if(err) {
        logger.error('addBookingFromUser: Error while making a booking: ' + err);
        res.json({ status: 500, success: false, message: 'Error while making a booking'});
      } else if(!user) {
        logger.error('addBookingFromUser: Error while making a booking, no user found');
        res.json({ status: 404, success: false, message: 'Error while making a booking'});
      } else {
        Booking.findOne({bookingReference: req.body.bookingReference, userID: user.userID}, function(err1, done) {
          if(err1) {
            logger.error('addBookingFromUser: Error while making a booking: ' + err1);
            res.json({ status: 500, success: false, message: 'Error while making a booking'});
          } else if(done) {
            logger.error('addBookingFromUser: Duplicate bookings');
            res.json({ status: 403, success: false, duplicate: true, message: 'You have already made a bookings for this item'});
          } else if(!done) {
            var booking = new Booking({bookingType: req.body.bookingType, bookingReference: req.body.bookingReference, count: req.body.count, userID: user._id});
            booking.save(function(err2) {
              if(err2) {
                logger.error('addBookingFromUser: Error while saving booking: ' + err2);
                res.json({ status: 500, success: false, message: 'Error while making a booking'});
              } else {
                logger.info('addBookingFromUser: Booking saved successfully');
                res.json({ status: 200, success: true, message: 'Booking done!'});
              }
            });
          }
        });
      }
    });
  },

  /**
  * Function to cancel a booking
  * @method: cancelBooking
  */
  cancelBooking: function(req, res) {
    Booking.findOneAndUpdate({bookingID: req.body.bookingID}, {status: 'I'}, function(err) {
      if(err) {
        logger.error('cancelBooking: Error in cancelling the record: ' + err);
        res.json({ status: 500, success: false, message: 'Error in cancelling the record'});
      } else {
        logger.info('cancelBooking: Record cancelled successfully');
        res.json({ status: 200, success: true, message: 'Record cancelled successfully'});
      }
    });
  },

  /**
  * Function to get user bookings
  * @method: getUserBookings
  */
  getUserBookings: function(req, res) {
    User.findOne({userID: req.body.userID}, function(err, user) {
      if(err) {
        logger.error('getUserBookings: Error in fetching the bookings for user: ' + err);
        res.json({ status: 500, success: false, message: 'Error in fetching the bookings for user'});
      } else if(!user) {
        logger.error('getUserBookings: No User found');
        res.json({ status: 404, success: false, message: 'Error in fetching the bookings for user'});
      } else {
        Booking.find({userID: user._id}, function(err1, bookings) {
          if(err1) {
            logger.error('getUserBookings: Error in fetching the bookings for user: ' + err);
            res.json({ status: 500, success: false, message: 'Error in fetching the bookings for user'});
          } else if(!bookings) {
            logger.error('getUserBookings: No Bookings found for the user');
            res.json({ status: 404, success: false, message: 'No bookings found for user'});
          } else {
            getBookingsList(bookings, function(status, bookingList) {
              if(status) {
                var responseArray = [];
                _.forEach(bookingList, function(value) {
                  var obj = {};
                  obj.booking = value;
                  obj.item = value.item;
                  responseArray.push(obj);
                });
                logger.info('getUserBookings: Bookings fetched for the user');
                res.json({ status: 200, success: true, bookingsList: responseArray});
              } else {
                logger.info('getUserBookings: Error in fetching the booking details');
                res.json({ status: 500, success: false, message: 'Error in fetching the bookings details'});
              }
            });
          }
        });
      }
    });
  },

  /**
  * Function get bookings made for category
  * @method: getBookingsForCategory
  */
  getBookingsForCategory: function(req, res) {

  },

  /**
  * Function to get bookings for the admin created courses / activities
  * @method: getCreatedUserBookings
  */
  getCreatedUserBookings: function(req, res) {

  }
};
