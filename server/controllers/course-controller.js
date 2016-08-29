/**
* Controller for course model, with the business logic.
*/
var _ = require('lodash');
var moment = require('moment');
var Course = require('../models/courses-model');
var User = require('../models/user-model');
var Category = require('../models/category-model');
var logger = require('../utils/logUtil').logger;

module.exports = {

  /**
  * Function to add course to the DB
  * @method: addCourse
  */
  addCourse: function(req, res) {
    User.findOne({userID: req.body.userID}, function(err, user) {
      if(err) {
        logger.error('addCourse: Error in finding the user: ' + err);
        res.json({ status: 500, success: false, message: 'Error in inserting the course'});
      } else if(!user) {
        logger.error('addCourse: requested user not found');
        res.json({ status: 404, success: false, message: 'Requested user not found in DB'});
      } else {
        Category.findOne({categoryID: req.body.categoryID}, function(err1, category) {
          if(err1) {
            logger.error('addCourse: Error in finding the category: ' + err);
            res.json({ status: 500, success: false, message: 'Error in inserting the course'});
          } else if(!category) {
             logger.error('addCourse: requested category not found');
             res.json({ status: 404, success: false, message: 'Requested category not found'});
           } else {
            var course = new Course({courseName: req.body.courseName, description: req.body.description, schedule: req.body.schedule, scheduleType: req.body.scheduleType, price: req.body.price, amenities: req.body.amenities, userID: user._id, categoryID: category._id});
            course.save(function(err2) {
              if(err2) {
                logger.error('addCourse: Error while inserting the course: ' + err);
                res.json({ status: 500, success: false, message: 'Error while inserting course'});
              } else {
                logger.info('addCourse: Course added successfully');
                res.json({ status: 200, success: true, message: 'Course added successfully'});
              }
            });
          }
        });
      }
    });
  },
  /**
  * Function to get all the courses
  * @method: getAllCoursesForUser
  */
  getAllCoursesForUser: function(req, res) {
    Course.find({status: 'A'}).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('getAllCourses: Error in fetching all the courses');
        res.json({ status: 500, success: false, message: 'Error in fetching all courses'});
      } else if(!courses) {
        logger.info('getAllCourses: No courses found');
        res.json({ status: 404, success: false, message: 'No Courses found'});
      } else {
        var coursesList = [];
        _.forEach(courses, function(value) {
          if(value.scheduleType === 'onetime') {
            value["courseStatus"] = (moment() > moment.unix(value.schedule) && value.scheduleType === 'onetime') ? 'Closed' : 'Open';
            value.schedule = moment.unix(value.schedule).format('YYYY-MM-DD HH:mm');
            coursesList.push(value);
          } else {
            coursesList.push(value);
          }
        });
        logger.info('Course list computed');
        res.json({ status: 200, success: true, count: coursesList.length, courseList: coursesList});
      }
    });
  },

  /**
  * Function to get upcoming courses
  * @method: getUpcomingCourses
  */
  getUpcomingCourses: function(req, res) {
    Course.find({status: 'A'}).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('getUpcomingCourses: Error while fetching upcoming courses ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching upcoming courses'});
      } else if(!courses) {
        logger.error('getUpcomingCourses: No upcoming courses');
        res.json({ status: 404, succes: false, message: 'No upcomging courses'});
      } else {
        var upcomgingCourseList = [];
        _.forEach(courses, function(value) {
          if(moment.unix(value.schedule) > moment() && value.scheduleType === 'onetime') {
            value.schedule = moment.unix(value.schedule).format('YYYY-MM-DD HH:mm');
            upcomgingCourseList.push(value);
          }
        });
        logger.info('getUpcomingCourses: Upcoming courses fetched');
        res.json({ status: 200, success: true, count: upcomgingCourseList.length, courseList: upcomgingCourseList});
      }
    });
  },

  /**
  * Function to get one-time courses only for users
  * @method: oneTimeCourseForUser
  */
  oneTimeCourseForUser: function(req, res) {
    Course.find({scheduleType: 'onetime', status: 'A'}).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('oneTimeCourseForUser: Error while getting one-time courses');
        res.json({ status: 500, success: false, message: 'Error while gettign one-time courses'});
      } else if(!courses) {
        logger.error('oneTimeCourseForUser: No one-time courses found');
        res.json({status: 404, success: false, message: 'No one-time courses found'});
      } else {
        var oneTimeCoursesList = [];
        _.forEach(courses, function(value) {
          value['courseStatus'] = (moment() > moment.unix(value.schedule)) ? 'Closed': 'Open';
          value.schedule = moment.unix(value.schedule).format('YYYY-MM-DD HH:mm');
          oneTimeCoursesList.push(value);
        });
        logger.info('One time course list fetched');
        res.json({ status: 200, success: true, count: oneTimeCoursesList.length, courseList: oneTimeCoursesList});
      }
    });
  },

  /**
  * Function to get recurring course list
  * @method: recurringCourseList
  */
  recurringCourseList: function(req, res) {
    Course.find({scheduleType: 'recurring', status: 'A'}).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('recurringCourseList: Error while fetching recurring course list: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching recurring course list'});
      } else if(!courses) {
        logger.error('recurringCourseList: No recurring courses found');
        res.json({ status: 400, success: false, message: 'No recurring courses found'});
      } else {
        logger.info('recurringCourseList: Recurring courses fetched');
        res.json({ status: 200, success: true, count: courses.length, courseList: courses});
      }
    });
  },

  /**
  * Function to courses created by admin users
  * @method: coursesByUser
  */
  coursesByUser:  function(req, res) {
    Course.find({createdUserID: req.body.userID}).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('coursesByUser: Error while fetching courses: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching courses'});
      } else if(!courses) {
        logger.error('coursesByUser: No courses created by the user');
        res.json({ status: 404, success: false, message: 'No courses created by the user'});
      } else {
        var coursesList = [];
        _.forEach(courses, function(value) {
          if(value.scheduleType === 'onetime') {
            value["courseStatus"] = (moment() > moment.unix(value.schedule) && value.scheduleType === 'onetime') ? 'Closed' : 'Open';
            value.schedule = moment.unix(value.schedule).format('YYYY-MM-DD HH:mm');
            coursesList.push(value);
          } else {
            coursesList.push(value);
          }
        });
        logger.info('coursesByUser: Courses fetched by created user');
        res.json({ status: 200, success: true, count: coursesList.length, courseList: coursesList});
      }
    });
  },

  /**
  * Function to get courses by category.
  * @method: getCoursesByCategory
  */
  getCoursesByCategory: function(req, res) {
    Activity.find({categoryID: req.body.categoryID, status: 'A'}, function(err, courses) {
      if(err) {
        logger.error('getCoursesByCategory: Error while fetching courses for specified category: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching courses for specified category'});
      } else if(!activities) {
        logger.error('getCoursesByCategory: No courses found for the category');
        res.json({ status: 404, success: false, message: 'No courses found for the category'});
      } else {
        var coursesList = [];
        _.forEach(courses, function(value) {
          if(value.scheduleType === 'onetime') {
            value["courseStatus"] = (moment() > moment.unix(value.schedule) && value.scheduleType === 'onetime') ? 'Closed' : 'Open';
            value.schedule = moment.unix(value.schedule).format('YYYY-MM-DD HH:mm');
            coursesList.push(value);
          } else {
            coursesList.push(value);
          }
        });
        logger.info('getCoursesByCategory: Courses fetched for the category');
        res.json({ status: 200, success: true, count: coursesList.length, courseList: coursesList});
      }
    });
  },

  /**
  * Function to inactivate the course
  * @method: inactivateCourse
  */
  inactivateCourse: function(req, res) {
    Course.findOneAndUpdate({courseID: req.body.courseID, createdUserID: req.body.userID}, function(err) {
      if(err) {
        logger.error('inactivateCourse: Error while inactivating course: ' + err);
        res.json({ status: 500, success: false, message: 'Error while inactivating course'});
      } else {
        logger.info('inactivateCourse: Course inactivated');
        res.json({ status: 200, success: true, message: 'Course inactivated'});
      }
    });
  }
};
