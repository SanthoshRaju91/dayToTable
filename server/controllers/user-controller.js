/**
* Controller for user model, available methods are given below.
* @methods - registerUser, authenticateUser, getUserList, getAdminUserList, authorizeUser, resetPassword
*/
var User = require('../models/user-model');
var passport = require('passport');
var jwt = require('jsonwebtoken');
var nodemailer = require('nodemailer');
var config = require('../config');
var logger = require('../utils/logUtil').logger;


/**
* Function to sendMail to user based on the type
* @method: sendMail
* @param: type - (resetPassword / register) , userMail - {string}
*/
function sendMail(type, userMail) {
  var smptTransportLayer = nodemailer.createTransport('SMPT', config.smptConfig);
  var mailingOptions = {
    from: config.adminEmail,
    to: userMail,
    subject: config.mail[type].subject,
    body: config.mail[type].body
  };
  smptTransportLayer.sendMail(mailingOptions, function(err, response) {
    if(err) {
      logger.error('sendMail: Error while sending email: ' + err);
    } else {
      logger.info(type.toUpperCase() + ' mail sent successfully');
    }
  });
};

module.exports = {
  /**
  * Function to register the user to the application database and send a mail to user emailAddress
  * @method: registerUser
  */
  registerUser: function(req, res) {
    var user = new User({emailAddress: req.body.emailAddress, password: req.body.password, firstName: req.body.firstName, lastName: req.body.lastName, contact: req.body.contact, gender: req.body.gender });
    user.save(function(err) {
      if(err) {
        if(err.code) {
          logger.error('registerUser: User already registered');
          res.json({ status: 500, success: false, message: 'User already registered, please log in.'});
        } else {
          logger.error('registerUser: Error in registering the user: ' + err);
          res.json({status: 500, success: false, message: 'Error in registering the user'});
        }
      } else {
        logger.info('registerUser: User registered successfully');
        sendMail('register', req.body.emailAddress);
        res.json({status: 200, success: true, message: 'User registered successfully'});
      }
    })
  },

  /**
  * Function to reset password
  * @method: resetPassword
  */
  resetPassword: function(req, res) {
    User.findOne({emailAddress: req.body.emailAddress}, function(err, user) {
      if(err) {
        logger.error('resetPassword: Error in fetching the user: ' + err);
        res.json({status: 500, success: false, message: 'Error in fetching the user'});
      } else if(!user) {
        logger.error('resetPassword: Could not fetch the user');
        res.json({status: 404, success: false, message: 'Could not fetch the user'});
      } else {
        user.comparePassword(req.body.oldPassword, function(isMatch) {
          if(!isMatch) {
            logger.error('resetPassword: Password did not match');
            res.json({status: 401, success: false, messge: 'Old password did not match'});
          } else {
            User.findOneAndUpdate({ userID: user.userID }, { password: req.body.password}, { new: false}, function(err1) {
              if(err1) {
                logger.error('resetPassword: Could not update the user password');
                res.json({ status: 500, success: false, message: 'Could not update the user password'});
              } else {
                logger.info('resetPassword: User password updated successfully');
                sendMail('resetPassword', user.emailAddress);
                res.json({ status: 200, success: true, message: 'User password updated successfully'});
              }
            });
          }
        });
      }
    });
  },

  /**
  * Function to authorize user to the api's
  * @method: authorizeUser
  */
  authorizeUser: function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['x-access-token'];
    if(token) {
      jwt.verify(token, config.session, function(err, decoded) {
        if(err) {
          logger.error('authorizeUser: Error in validating user token');
          res.json({status: 401, success: false, message: 'Failed to authenticate user'});
        } else {
          req.decoded = decoded;
          next();
        }
      });
    } else {
      res.json({status: 403, success: false, message: 'No token provided'});
    }
  },

  /**
  * Function to authenticate user on credentials
  * @method: authenticateUser
  */
  authenticateUser: function(req, res) {
    console.log(req.body.emailAddress);
    User.findOne({ emailAddress: req.body.emailAddress}, function(err, user) {
      if(err) {
        logger.error('authenticateUser: Could not fetch the user details: ' + err);
        res.json({status: 500, success: false, message: 'Error while authicating user'});
      } else if(!user) {
        logger.error('authenticateUser: Could not fetch the specified user: ');
        res.json({ status: 404, success: false, message: 'Invalid email address'});
      } else {
        user.comparePassword(req.body.password, function(isMatch) {
          if(!isMatch) {
            logger.error('authenticateUser: User credentials did not match');
            res.json({ status: 401, success: false, message: 'User credentials did not match'});
          } else {
            logger.info('authenticateUser: User logged in successfully');
            var token = jwt.sign(user, config.session, {expiresIn: 6000});
            res.json({ status: 200, success: true, message: 'User logged in!',  token: token, role: user.role, user: user});
          }
        });
      }
    });
  },

  /**
  * Function to get list of all registered user in the system.
  * @method: getUserList
  */
  getUserList: function(req, res) {
    User.find({}, function(err, users) {
      if(err) {
        logger.error('getUserList: Error while fetching user details: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching user details'});
      } else {
        logger.info('getUserList: user details fetched');
        res.json({ status: 200, success: true, count: users.length, userList: users});
      }
    });
  },

  /**
  * Function to get list of admin user only in the system
  * @method: getAdminUserList
  */
  getAdminUserList: function(req, res) {
    User.find({role: 'A'}, function(err, users) {
      if(err) {
        logger.error('getAdminUserList: Error while fetching admin users: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetching admin users'});
      } else {
        logger.info('getAdminUserList: admin users fetched');
        res.json({ status: 200, success: true, message: 'User details fetched!', count: users.length, adminUserList: users});
      }
    })
  },

  /**
  * Function to grant admin access to user
  */
  updateToAdmin: function(req, res) {
    User.findOne({emailAddress: req.body.emailAddress}, function(err, user) {
      if(err) {
        logger.error('updateToAdmin: Error in updating the user: ' + err);
        res.json({ status: 500, success: false, message: 'Error in granting access'});
      } else if(!user) {
        logger.error('updateToAdmin: Could not find the specified user');
        res.json({ status: 404, success: false, message: 'Could not fetch the specified user'});
      } else {
        User.findOneAndUpdate({userID: user.userID}, {role: 'A'}, function(err1) {
          if(err1) {
            logger.error('updateToAdmin: Error in updating the user role: ' + err1);
            res.json({ status: 500, success: false, message: 'Error in updating the user role'});
          } else {
            logger.info('updateToAdmin: Admin access granted to the user');
            res.json({ status: 200, success: true, message: 'Admin access granted to the user'});
          }
        });
      }
    });
  },

  /**
  * Function to remove the user
  * @method: removeUser
  */
  removeUser: function(req, res) {
    User.findOne({emailAddress: req.body.emailAddress}, function(err, user) {
      if(err) {
        logger.error('removeUser: Error while removing the user: ' + err);
        res.json({ status: 500, success: false, message: 'Error while removing the user'});
      } else if(!user) {
        logger.error('removeUser: Could not find the specified user');
        res.json({ status: 404, success: false, message: 'Could not find the specified user'});
      } else {
        User.findOneAndUpdate({userID: user.userID}, {status: 'I'}, function(err1) {
          if(err1) {
            logger.error('removeUser: Error in removing the user from DB: ' + err);
            res.json({ status: 500, success: false, message: 'Error in removing the user from DB'});
          } else {
            logger.info('User removed from DB');
            res.json({ status: 200, success: true, message: 'User removed successfully'});
          }
        });
      }
    });
  }
};
