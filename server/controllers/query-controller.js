/**
* Controller for queryMessage model, to save and retrieve the queries
*/

var _ = require('lodash');
var User = require('../models/user-model');
var Query = require('../models/query-message-model');
var logger = require('../utils/logUtil').logger;

module.exports  = {
  /**
  * Function to save the user request in DB.
  * @method: saveQuery
  */
  saveQuery: function(req, res) {
    var query = new Query({firstName: req.body.firstName, lastName: req.body.lastName, emailAddress: req.body.emailAddress, phone: req.body.phone, message: req.body.message});
    query.save(function(err) {
      if(err) {
        logger.error('saveQuery: Error while saving the query: ' + err);
        res.json({status: 500, success: false, message: 'Error while saving your request'});
      } else {
        logger.info('saveQuery: User query saved successfully');
        res.json({status: 200, success: true, message: 'Request saved'});
      }
    });
  },

  /**
  * Function to get all the query for Super admin to review it
  * @method: getAllQueries
  */
  getAllQueries: function(req, res) {
    User.findOne({emailAddress: req.body.emailAddress, role: 'SA'}).exec(function(err, user) {
      if(err) {
        logger.error('getAllQueries: Error in fetching the authenticated user: ' + err);
        res.json({status: 500, success: false, message: 'Error in fetchign the authenticated user'});
      } else if(!user) {
        logger.error('getAllQueries: user not authenticated');
        res.json({status: 403, success: false, message: 'User not authenticated'});
      } else {
        logger.info('getAllQueries: user authenticated');
        Query.find({}).sort('-createdDate').exec(function(err1, queries) {
          if(err1) {
            logger.error('getAllQueries: Could not fetch queries: ' + err1);
            res.json({status: 500, success: false, message: 'Could not fetch queries'});
          } else if(!queries) {
            logger.error('getAllQueries: no queries found');
            res.json({ status: 404, success: false, message: 'No queries found'});
          } else {
            logger.info('getAllQueries: queries fetched');
            res.json({status: 200, success: true, count: queries.count, queryList: queries});
          }
        });
      }
    });
  },

  /**
  * Function to mark it complete only for super admin
  * @method: markAsComplete
  */
  markAsComplete: function(req, res) {
    Query.findOneAndUpdate({QueryID: req.body.QueryID}, {status: 'C'}, function(err) {
      if(err) {
        logger.error('markAsComplete: Error while updating the query: '+ err);
        res.json({ status: 500, success: false, message: 'Error while updating the query'});
      } else {
        logger.info('markAsComplete: Query marked as complete');
        res.json({ status: 200, success: true, message: 'Query marked as complete'});
      }
    });
  }
};
