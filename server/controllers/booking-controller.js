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
  * Function to make a course bookings for user.
  * @method: addCourseBookingFromUser
  */

  addCourseBookingFromUser: function(req, res) {
    User.findOne({emailAddress: req.body.emailAddress}, function(err, user) {
      if(err) {
        logger.error('addCourseBookingFromUser: error while fetching user details' + err);
        res.json({ status: 500, success: false, message: 'Error while making a booking'});
      } else if(!user) {
        logger.info('addCourseBookingFromUser: New user booking proceed as guest user');
        var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, emailAddress: req.body.emailAddress, contact: req.body.telephone, status: 'P'});
        user.save(function(err1, userObject) {
          if(err1) {
            logger.error('addCourseBookingFromUser: Error while creating a new guest user' + err1);
            res.json({ status: 500, success: false, message: 'Error while making a booking'});
          } else if(userObject) {
            Course.findOne({courseID: req.body.courseId}, function(err3, course) {
              if(err3) {
                logger.error('addCourseBookingFromUser: Error while fetching course details ' + err3);
                res.json({ status: 500, success: false, message: 'Error while making a booking'});
              } else if(!course) {
                logger.error('addCourseBookingFromUser: No course found for the course id');
                res.json({ status: 404, success: false, message: 'No Course found for the course id'});
              } else {
                var totalPrice = (req.body.adultCount + req.body.childrenCount) * course.price;
                var courseBooking = new Booking({bookingType: 'recurring', reference: 'course', bookingReference: course.courseID, adultCount: req.body.adultCount, childrenCount: req.body.childrenCount, count: (parseInt(req.body.adultCount) + parseInt(req.body.childrenCount)), specifiedDate: req.body.date, totalPrice: totalPrice,userID: userObject._id});
                courseBooking.save(function(err2, bookedCourse) {
                  if(err2) {
                    logger.error('addCourseBookingFromUser: Error while making a guest course booking' + err2);
                    res.json({ status: 500, success: false, message: 'Error while making a guest course booking'});
                  } else {
                    logger.info('addCourseBookingFromUser: Guest course booking successful');
                    res.json({ status: 200, success: true, message: 'Guest course booking successful', booking: bookedCourse._id});
                  }
                });
              }
            });
          }
        });
      } else {
        Course.findOne({courseID: req.body.courseId}, function(err5, course) {
          if(err5) {
            logger.error('addCourseBookingFromUser: Error while fetching course details ' + err5);
            res.json({ status: 500, success: false, message: 'Error while making a booking'});
          } else if(!course) {
            logger.error('addCourseBookingFromUser: No course found for the course id');
            res.json({ status: 404, success: false, message: 'No Course found for the course id'});
          } else {
            var totalPrice = (req.body.adultCount + req.body.childrenCount) * course.price;
            var courseBooking = new Booking({bookingType: 'recurring', reference: 'course', bookingReference: course.courseID, adultCount: req.body.adultCount, childrenCount: req.body.childrenCount, count: (parseInt(req.body.adultCount) + parseInt(req.body.childrenCount)), specifiedDate: req.body.date, totalPrice: totalPrice,userID: user._id});
            courseBooking.save(function(err4, bookedCourse) {
              if(err4) {
                logger.error('addCourseBookingFromUser: Error while making a course booking' + err4);
                res.json({ status: 500, success: false, message: 'Error while making a guest course booking'});
              } else {
                logger.info('addCourseBookingFromUser: Course booking successful');
                res.json({ status: 200, success: true, message: 'Course booking successful', booking: bookedCourse._id});
              }
            });
          }
        });
      }
    });
  },

    /**
    * Function to add booking for activity from user.
    * @method: addBookingActivityFromUser
    */
    addBookingActivityFromUser: function(req, res) {
      User.findOne({emailAddress: req.body.emailAddress}, function(err, user) {
        if(err) {
          logger.error('addBookingActivityFromUser: Error while fetching the user: ' + err);
          res.json({ status: 500, success: false, message: 'Error while booking activity'});
        } else if(!user) {
          logger.info('addBookingActivityFromUser: New user booking proceed as guest user');
          var user = new User({firstName: req.body.firstName, lastName: req.body.lastName, emailAddress: req.body.emailAddress, contact: req.body.telephone, status: 'P'});
          user.save(function(err1, userObject) {
            if(err1) {
              logger.error('addBookingActivityFromUser: Error while registering the user: ' + err1);
              res.json({ status: 500, success: false, message: 'Error while booking activity'});
            } else {
              Activity.findOne({activityID: req.body.activityID}, function(err2, activity) {
                if(err2) {
                  logger.error('addBookingActivityFromUser: Error while fetching activity in create user booking: ' + err2);
                  res.json({ status: 500, success: false, message: 'Error while booking activity'});
                } else if(!activity) {
                  logger.error('addBookingActivityFromUser: No activity found for the id');
                  res.json({ status: 404, success: false, message: 'Error while booking activity'});
                } else {
                  var totalPrice = (req.body.adultCount + req.body.childrenCount) * activity.price;
                  var activityBooking = new Booking({bookingType: 'onetime', reference: 'activity', bookingReference: activity.activityID, adultCount: req.body.adultCount, childrenCount: req.body.childrenCount, count: (parseInt(req.body.adultCount) + parseInt(req.body.childrenCount)), totalPrice: totalPrice, userID: userObject._id});
                  activityBooking.save(function(err3, bookedActivity) {
                    if(err3) {
                      logger.error('addBookingActivityFromUser: Error while booking activity in new user flow: ' + err3);
                      res.json({ status: 500, success: false, message: 'Error while making a booking'});
                    } else {
                      logger.info('addBookingActivityFromUser: Booking for activity done successfully');
                      res.json({ status: 200, success: true, message: 'activity booked!', booking: bookedActivity._id});
                    }
                  });
                }
              });
            }
          });
        } else {
          Activity.findOne({activityID: req.body.activityID}, function(err4, activity) {
            if(err4) {
              logger.error('addBookingActivityFromUser: Error while fetching activity in registered user flow: ' + err4);
              res.json({ status: 500, success: false, message: 'Error while booking activity'});
            } else if(!activity) {
              logger.error('addBookingActivityFromUser: No activity found for the id');
              res.json({ status: 404, success: false, message: 'Error while booking activity'});
            } else {
              var totalPrice = (req.body.adultCount + req.body.childrenCount) * activity.price;
              var activityBooking = new Booking({bookingType: 'onetime', reference: 'activity', bookingReference: activity.activityID, adultCount: req.body.adultCount, childrenCount: req.body.childrenCount, count: (parseInt(req.body.adultCount) + parseInt(req.body.childrenCount)), totalPrice: totalPrice, userID: user._id});
              activityBooking.save(function(err5, bookedActivity) {
                if(err5) {
                  logger.error('addBookingActivityFromUser: Error while booking activity in registered user flow: ' + err5);
                  res.json({ status: 500, success: false, message: 'Error while booking activity'});
                } else {
                  logger.info('addBookingActivityFromUser: Booking for activity done');
                  res.json({ status: 200, success: true, message: 'Activity booked!!', booking: bookedActivity._id})
                }
              });
            }
          });
        }
      });
    },

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
        Booking.findOne({bookingReference: req.body.categoryID, userID: user.userID}, function(err1, done) {
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

  },


  /**
  * Function to get booking details by id.
  * @method: getBookingById
  */
  getBookingById: function(req, res) {
    var id = req.params.id;

    Booking.findOne({_id: id}).populate('userID').exec(function(err, booking) {
      if(err) {
        logger.error('getBookingById: Error while fetching booking details' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching booking details'});
      } else if(!booking) {
        logger.error('getBookingById: No booking found for the reference');
        res.json({ status: 404, success: false, message: 'No booking found for the reference'});
      } else {
        var response = {};
        response.booking = booking;
        if(booking.reference == 'course') {
          Course.findOne({courseID: booking.bookingReference}).populate('categoryID').exec(function(err1, course) {
            if(err1) {
              logger.error('getBookingById: Error while fetching related course for booking' + err1);
              response.reference = {};
              res.json({ status: 200, success: true, reference: false, bookingReference: 'Course', booking: response});
            } else if(!course) {
              logger.error('getBookingById: No course found for the booking reference');
              response.reference = {};
              res.json({ status: 200, success: true, reference: false, bookingReference: 'Course', booking: response});
            } else {
              logger.info('getBookingById: Course fetched for the booking reference');
              response.reference = course;
              res.json({ status: 200, success: true, reference: true, bookingReference: 'Course', booking: response});
            }
          });
        } else if(booking.reference == 'activity') {
          var response = {};
          response.booking = booking;
          Activity.findOne({activityID: booking.bookingReference}).populate('categoryID').exec(function(err2, activity) {
            if(err2) {
              logger.error('getBookingById: Error while fetching related activity for booking' + err2);
              response.reference = {};
              res.json({ status: 200, success: true, reference: false, bookingReference: 'Activity', booking: response});
            } else if(!activity) {
              logger.error('getBookingById: No activity found for the booking reference');
              response.reference = {};
              res.json({ status: 200, success: true, reference: false, bookingReference: 'Activity', booking: response});
            } else {
              logger.info('getBookingById: Activity fetched for the booking reference');
              response.reference = activity;
              res.json({ status: 200, success: true, reference: true, bookingReference: 'Activity', booking: response});
            }
          });
        }
      }
    });
  }
};
