/**
* Controller for activities model, and the business logic.
* @methods -
*/
var _ = require('lodash');
var moment = require('moment');
var Activity = require('../models/activities-model');
var User = require('../models/user-model');
var Category = require('../models/category-model');
var logger = require('../utils/logUtil').logger;

module.exports = {

  /**
  * Function to add activity to the DB
  * @method: addActivity
  */
  addActivity: function(req, res) {
    User.findOne({userID: req.body.userID}, function(err, user) {
      if(err) {
        logger.error('addActivity: Error in finding the user: ' + err);
        res.json({ status: 500, success: false, message: 'Error in inserting the activity'});
      } else if(!user) {
        logger.error('addActivity: requested user not found');
        res.json({ status: 404, success: false, message: 'Requested user not found in DB'});
      } else {
        Category.findOne({categoryID: req.body.categoryID}, function(err1, category) {
          if(err1) {
            logger.error('addActivity: Error in finding the category: ' + err);
            res.json({ status: 500, success: false, message: 'Error in inserting the activity'});
          } else if(!category) {
             logger.error('addActivity: requested category not found');
             res.json({ status: 404, success: false, message: 'Requested category not found'});
           } else {
             var activity = new Activity({activityName: req.body.activityName, description: req.body.description, schedule: req.body.schedule, scheduleType: req.body.scheduleType, price: req.body.price, amenities: req.body.amenities, address: req.body.address, languages: req.body.languages, parking: req.body.parking, imageUrl: req.body.imageUrl, duration: req.body.duration, categoryID: category._id, creadtedUserID: user._id});
             activity.save(function(err2) {
               if(err2) {
                 logger.error('addActivity: Error while inserting the activity: ' + err);
                 res.json({ status: 500, success: false, message: 'Error while inserting activity'});
               } else {
                 logger.info('addActivity: Activity added successfully');
                 res.json({ status: 200, success: true, message: 'Activity added successfully'});
               }
             });
           }
        });
      }
    });
  },

  /**
  * Function to get all the activities
  * @method: getAllActivitiesForUser
  */
  getAllActivitiesForUser: function(req, res) {
    Activity.find({status: 'A'}).sort('createdDate').populate('categoryID').exec(function(err, activities) {
      if(err) {
        logger.error('getAllActivitiesForUser: Error in fetching all the activities');
        res.json({ status: 500, success: false, message: 'Error in fetching all activites'});
      } else if(!activities) {
        logger.info('getAllActivitiesForUser: No courses found');
        res.json({ status: 404, success: false, message: 'No Activites found'});
      } else {
        var oneTimeActivityList = [];
        _.forEach(activities, function(value) {
          var current = Object.assign({}, value);
          current['activityStatus'] = (new Date() > value.schedule) ? 'Closed': 'Open';
          current.schedule = moment(value.schedule).format('YYYY-MM-DD HH:mm');
          oneTimeActivityList.push(current);
        });
        logger.info('Activity list computed' + activities[0].schedule);
        res.json({ status: 200, success: true, count: oneTimeActivityList.length, activityList: oneTimeActivityList});
      }
    });
  },

  /**
  * Function to get upcoming courses
  * @method: getUpcomingActivites
  */
  getUpcomingActivites: function(req, res) {
    Activity.find({status: 'A'}).where('schedule').gte(new Date()).populate('categoryID').exec(function(err, activities) {
      if(err) {
        logger.error('getUpcomingActivites: Error while fetching upcoming activites ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching upcoming activites'});
      } else if(!activities) {
        logger.error('getUpcomingActivites: No upcoming activites');
        res.json({ status: 404, succes: false, message: 'No upcomging activites'});
      } else {
        var upcomgingActivityList = [];
        _.forEach(activities, function(value) {
          var current = {};
          current['activityID'] = value.activityID;
          current['activityName'] = value.activityName;
          current['category'] = value.categoryID.categoryName;
          current['schedule'] = value.schedule;
          current['price'] = value.price;
          current['imageUrl'] = value.imageUrl;
          upcomgingActivityList.push(current);
        });
        logger.info('getUpcomingActivites: Upcoming activities fetched');
        res.json({ status: 200, success: true, count: upcomgingActivityList.length, activityList: upcomgingActivityList});
      }
    });
  },


  /**
  * Function to retreive activities created by admin users
  * @method: activitiesByUser
  */
  activitiesByUser: function(req, res) {
    Activity.find({createdUserID: req.body.userID}).sort('createdDate').populate('categoryID').exec(function(err, activities) {
      if(err) {
        logger.error('activitiesByUser: Error while fetching activities: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching activities'});
      } else if(!activities) {
        logger.error('activitiesByUser: No activities created by the user');
        res.json({ status: 404, success: false, message: 'No activities created by the user'});
      } else {
        var oneTimeActivityList = [];
        _.forEach(activities, function(value) {
          var current = Object.assign({}, value);
          current['activityStatus'] = (new Date() > value.schedule) ? 'Closed': 'Open';
          current.schedule = moment(value.schedule).format('YYYY-MM-DD HH:mm');
          oneTimeActivityList.push(current);
        });
        logger.info('activitiesByUser: Activities fetched by created user');
        res.json({ status: 200, success: true, count: oneTimeActivityList.length, activityList: oneTimeActivityList});
      }
    });
  },

  /**
  * Function to retreive the count of activities created by user
  * @method: activitesCountByUser
  */
  activitesCountByUser: function(req, res) {
    Activity.find({createdUserID: req.params.userID}, function(err, activities) {
      if(err) {
        logger.error('activitesCountByUser: Error while fetching activities count: ' + err);
        res.json({status: 500, success: false, message: 'Error while fetching activities count'});
      } else if(!activities) {
        logger.error('activitesCountByUser: No records found');
        res.json({status: 200, success: true, count: 0});
      } else {
        logger.info('activitesCountByUser: Count fetched');
        res.json({status: 200, success: true, count: activities.length});
      }
    });
  },

  /**
  * Function to get activities by category.
  * @method: getActivitiesByCategory
  */
  getActivitiesByCategory: function(req, res) {
    Category.findOne({categoryID: req.params.categoryID}, function(err, category) {
      if(err) {
        logger.error('getActivitiesByCategory: Error while fetching category details: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching category details'});
      } else if(!category) {
        logger.error('getActivitiesByCategory: No category found for the categoryID');
        res.json({ status: 404, success: false, message: 'No category found for the categoryID'});
      } else {
        Activity.find({categoryID: category._id, status: 'A', scheduleType: 'onetime'}).sort('createdDate').populate('categoryID').exec(function(err1, activities) {
          if(err1) {
            logger.error('getActivitiesByCategory: Error while fetching activites for specified category: ' + err1);
            res.json({ status: 500, success: false, message: 'Error while fetching activities for specified category'});
          } else if(!activities) {
            logger.error('getActivitiesByCategory: No Activities found for the category');
            res.json({ status: 404, success: false, message: 'No Activites found for the category'});
          } else {
            var oneTimeActivityList = [];
            _.forEach(activities, function(value) {
              var current = Object.assign({}, value);
              current['activityStatus'] = (new Date() > value.schedule) ? 'Closed': 'Open';
              current.schedule = moment(value.schedule).format('YYYY-MM-DD HH:mm');
              oneTimeActivityList.push(current);
            });
            logger.info('activitiesByUser: Activities fetched for the category');
            res.json({ status: 200, success: true, count: oneTimeActivityList.length, activityList: oneTimeActivityList});
          }
        });

      }
    });
  },

  /**
  * Function to get activity details by ID
  * @method: getActivityById
  */

  getActivityById: function(req, res) {
    var activityID = req.params.id || '';
    var populateQuery = [{path: 'creadtedUserID'}, {path: 'categoryID'}];
    Activity.findOne({activityID: activityID}).populate(populateQuery).exec(function(err, activity) {
      if(err) {
        logger.error('getActivityById: Error in fetching activity details: ' + err);
        res.json({status: 500, success: false, message: 'Error in fetching activity details'});
      } else if(!activity) {
        logger.error('getActivityById: No activity found for the given id');
        res.json({ status: 404, success: false, message: 'No record found'});
      } else {
        activity['activityStatus'] = (new Date() > activity.schedule) ? 'Closed': 'Open';
        activity.schedule = moment(activity.schedule).format('YYYY-MM-DD HH:mm');
        logger.info('getActivityById: Activity fetched for the specified id');
        res.json({ status: 200, success: true, activity: activity, activityStatus: activity.activityStatus});
      }
    });
  },
  /**
  * Function to inactivate the course
  * @method: inactivateActivity
  */
  inactivateActivity: function(req, res) {
    Activity.findOneAndUpdate({activityID: req.body.activityID, createdUserID: req.body.userID}, function(err) {
      if(err) {
        logger.error('inactivateActivity: Error while inactivating activity: ' + err);
        res.json({ status: 500, success: false, message: 'Error while inactivating activity'});
      } else {
        logger.info('inactivateActivity: Activity inactived');
        res.json({ status: 200, success: true, message: 'Activity inactivated'});
      }
    });
  },

  /**
  * Function to get sorted list data.
  * @method: getSortedActivitiesList
  */
  getSortedActivitiesList: function(req, res) {
    var sort = (req.params.sort === 'highest') ?  "-" + req.params.type : req.params.type;
    Activity.find({status: 'A'}).sort(sort).populate('categoryID').exec(function(err, activities) {
      if(err) {
        logger.error('getSortedActivitiesList: Error while fetching sorted activities list: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching sorted activities list'});
      } else if(!activities) {
        logger.error('getSortedActivitiesList: Could not find records for the applied sort');
        res.json({ status: 404, success: false, message: 'Could not find record for the applied sort'});
      } else {
        var oneTimeActivityList = [];
        _.forEach(activities, function(value) {
          var current = Object.assign({}, value);
          current['activityStatus'] = (new Date() > value.schedule) ? 'Closed': 'Open';
          current.schedule = moment(value.schedule).format('YYYY-MM-DD HH:mm');
          oneTimeActivityList.push(current);
        });
        logger.info('getSortedActivitiesList: List fetched for the applied sort');
        res.json({ status: 200, success: true, count: oneTimeActivityList.length, activityList: oneTimeActivityList});
      }
    });
  }
};
