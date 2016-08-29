/*
* Category model - Mongoose schema holds all the category for activites & courses
* attrs - categoryID, categoryName, createDate
*/

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var autoIncrement = require('mongoose-auto-increment');

var CategorySchema = new Schema({
  categoryName: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now()
  }
});

CategorySchema.plugin(autoIncrement.plugin, {model: 'Category', field: 'categoryID', startAt: 1});

module.exports = mongoose.model('Category', CategorySchema);
