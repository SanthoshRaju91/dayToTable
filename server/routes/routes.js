/**
* Contains all the routes for the project.
*/
var express = require('express');
var router = express.Router();

var courseController = require('../controllers/course-controller');
var userController = require('../controllers/user-controller');
var categoryController = require('../controllers/category-controller');
var activityController = require('../controllers/activity-controller');
var bookingController = require('../controllers/booking-controller');
var queryController = require('../controllers/query-controller');

// User specific routes
router.post('/registerUser', userController.registerUser);
router.get('/getUserList', userController.getUserList);
router.post('/resetPassword', userController.resetPassword);
router.get('/getAdminUserList', userController.getAdminUserList);
router.post('/updateToAdmin', userController.updateToAdmin);
router.post('/removeUser', userController.removeUser);

// Category specific routes
router.post('/addCategory', categoryController.addCategory);
router.get('/getCategoryList', categoryController.getCategoryList);
router.post('/updateCategory', categoryController.updateCategory);
router.post('/deleteCategory', categoryController.deleteCategory);

// Course specific routes
router.post('/addCourse', courseController.addCourse);
router.get('/getAllCoursesForUser', courseController.getAllCoursesForUser);
router.get('/getUpcomingCourses', courseController.getUpcomingCourses);
router.post('/coursesByUser', courseController.coursesByUser);
router.post('/inactivateCourse', courseController.inactivateCourse);
router.get('/getCoursesByCategory', courseController.getCoursesByCategory);
router.get('/getSortedCoursesList/:type/:sort', courseController.getSortedCoursesList);
router.get('/getCourseById/:id', courseController.getCourseById);
router.get('/getPopularCourses', courseController.getPopularCourses);

// Activity specific routes
router.post('/addActivity', activityController.addActivity);
router.get('/getAllActivitiesForUser', activityController.getAllActivitiesForUser);
router.get('/getUpcomingActivites', activityController.getUpcomingActivites);
router.get('/activitiesByUser', activityController.activitiesByUser);
router.post('/inactivateActivity', activityController.inactivateActivity);
router.get('/getActivitiesByCategory/:categoryID', activityController.getActivitiesByCategory);
router.get('/getActivityById/:id', activityController.getActivityById);
router.get('/getSortedActivitiesList/:type/:sort', activityController.getSortedActivitiesList);

// Booking specific routes
router.post('/addCourseBookingFromUser', bookingController.addCourseBookingFromUser);
router.post('/addBookingFromUser', bookingController.addBookingFromUser);
router.post('/cancelBooking', bookingController.cancelBooking);
router.post('/getUserBookings', bookingController.getUserBookings);
router.get('/getBookingById/:id', bookingController.getBookingById);


//Query / request routes
router.post('/queryMessage', queryController.saveQuery);

module.exports = router;
