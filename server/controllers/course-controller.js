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
            var course = new Course({courseName: req.body.courseName, description: req.body.description, schedule: req.body.schedule, price: req.body.price, amenities: req.body.amenities, address: req.body.address, languages: req.body.languages, parking: req.body.parking, imageUrl: req.body.imageUrl, startFrom: req.body.startFrom, createdUserID: user._id, categoryID: category._id});
            course.save(function(err2) {
              if(err2) {
                logger.error('addCourse: Error while inserting the course: ' + err2);
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
        logger.info('Course list computed');
        res.json({ status: 200, success: true, count: courses.length, courseList: courses});
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
        logger.info('getUpcomingCourses: Upcoming courses fetched');
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
        logger.info('coursesByUser: Courses fetched by created user');
        res.json({ status: 200, success: true, count: courses.length, courseList: courses});
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
        logger.info('getCoursesByCategory: Courses fetched for the category');
        res.json({ status: 200, success: true, count: courses.length, courseList: courses});
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
  },

  /**
  * Function to get sorted list of courses
  * @method: getSortedCoursesList
  */
  getSortedCoursesList: function(req, res) {
    var sort = (req.params.sort === 'highest') ?  "-" + req.params.type : req.params.type;
    Course.find({status: 'A'}).sort(sort).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('getSortedCourseList: Error while fetching sorted list of courses' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching sorted list of courses'});
      } else if(!courses) {
        logger.error('getSortedCourseList: No sorted courses found');
        res.json({ status: 404, success: false, message: 'No sorted courses found'});
      } else {
        logger.info('getSortedCourseList: Sorted list of courses fetched');
        res.json({ status: 200, success: true, count: courses.length, courseList: courses});
      }
    });
  },

  /**
  * Function to get course details by id.
  * @method: getCourseById
  */
  getCourseById: function(req, res) {
    var courseID = req.params.id || '';
    var populateQuery = [{path: 'createdUserID'}, {path: 'categoryID'}];
    Course.findOne({courseID: courseID}).populate(populateQuery).exec(function(err, course) {
      if(err) {
        logger.error('getCourseById: Error while fetching course details by id' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching course details by id'});
      } else if(!course) {
        logger.error('getCourseById: No course found for id');
        res.json({ status: 404, success: false, message: 'No course found for id'});
      } else {
        logger.info('getCourseById: Course details fetched for the id');
        res.json({ status: 200, success: true, course: course});
      }
    });
  },

  /**
  * Function to get popular courses.
  * @method: getPopularCourses
  */
  getPopularCourses: function(req, res) {
    Course.find({status: 'A'}).where('ratings').gt(2).limit(8).populate('categoryID').exec(function(err, courses) {
      if(err) {
        logger.error('getPopularCourses: Error while getting popular courses for users');
        res.json({ status: 500, success: false, message: 'Error while getting popular courses for users'});
      } else if(!courses) {
        logger.error('getPopularCourses: No popular courses found');
        res.json({ status: 404, success: false, message: 'No popular courses found'});
      } else {
        var popularCourseArray = [];
        _.forEach(courses, function(course) {
          var current = {};
          current['courseID'] = course.courseID;
          current['courseName'] = course.courseName;
          current['address'] = course.address;
          current['category'] = course.categoryID.categoryName;
          current['price'] = course.price;
          current['ratings'] = course.ratings;
          current['imageUrl'] = course.imageUrl;
          popularCourseArray.push(current);
        });
        logger.info('getPopularCourses: Popular courses fetched');
        res.json({ status: 200, success: true, count: popularCourseArray.length, courseList: popularCourseArray});
      }
    });
  }
};
