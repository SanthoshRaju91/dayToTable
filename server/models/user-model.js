/*
* User Model - Mongoose Schema
* attrs emailAddress, password, firstName, lastName, contact, gender, createDate, modifiedDate
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');
var bcrypt = require('bcryptjs');
var logger = require('../utils/logUtil').logger;

var UserSchema = new Schema({
  emailAddress: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    select: false
  },
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  contact: {
    type: Number
  },
  createDate: {
    type: Date,
    default: Date.now()
  },
  modifiedDate: {
    type: Date,
    default: Date.now()
  },
  status: {
    type: String,
    default: 'A'
  },
  role: {
    type: String,
    default: 'U'
  }
});

/*
* Auto increment to User schema
* ID: userID
*/
UserSchema.plugin(autoIncrement.plugin, {model: 'User', field: 'userID', startAt: 1});

/*
* Pre-save method for hashing the user password before saving to DB.
*/
UserSchema.pre('save', function(next) {
  var user = this;
  if(!user.isModified('password')) return next();
  bcrypt.genSalt(10, function(err, salt) {
    if(err) {
      logger.error('Error in generating Salt: ' + err);
      return next(err);
    } else {
      bcrypt.hash(user.password, salt, function(err1, hash) {
        if(err1) {
          logger.error('Error in generating hash password: ' + err1);
          return next(err);
        } else {
          user.password = hash;
          next();
        }
      });
    }
  });
});

/*
* Callback method for comparing user passwords
*/
UserSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.password, function(err, isMatch) {
    if(err) {
      logger.error('Error while matching password: ' + err);
      callback(err);
    } else {
      callback(isMatch);
    }
  });
}

module.exports = mongoose.model('User', UserSchema);
