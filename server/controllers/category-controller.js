/**
* Category model - mongoose schema
* @methods
*/

var Category = require('../models/category-model');
var logger = require('../utils/logUtil').logger;

module.exports = {

  /**
  * Function to add category to the DB
  * @method: addCategory
  */
  addCategory: function(req, res) {
    var category = new Category({categoryName: req.body.categoryName});
    category.save(function(err) {
      if(err) {
        logger.error('addCategory: Error while adding category: ' + err);
        res.json({ status: 500, success: false, message: 'Error while adding category'});
      } else {
        logger.info('addCategory: new category added successfully');
        res.json({ status: 200, success: true, message: 'New Category added successfully'});
      }
    });
  },

  /**
  * Function to get the list of category available
  * @method: getCategoryList
  */
  getCategoryList: function(req, res) {
    Category.find({}, function(err, categories) {
      if(err) {
        logger.error('getCategoryList: Error while fetching the category list: ' + err);
        res.json({ status: 500, success: false, message: 'Error while fetchign category list'});
      } else {
        logger.info('getCategoryList: category list fetched');
        res.json({ status: 200, success: true, categoryList: categories});
      }
    });
  },

  /**
  * Function to update a category
  * @method: updateCategory
  */
  updateCategory: function(req, res) {
    Category.findOneAndUpdate({categoryID: req.body.categoryID}, {categoryName: req.body.categoryName}, function(err) {
      if(err) {
        logger.error('updateCategory: Error while updating category: ' + err);
        res.json({ status: 500, success: false, message: 'Error while updating category'});
      } else {
        logger.info('updateCategory: updated category successfully');
        res.json({ status: 200, success: false, message: 'Updated successfully'});
      }
    });
  },

  /**
  * Function to delete a category
  * @method: deleteCategory
  */
  deleteCategory: function(req, res) {
    Category.remove({categoryID: req.body.categoryID}, function(err) {
      if(err) {
        logger.error('deleteCategory: Error while deleting category: ' +err);
        res.json({ status: 500, success: false, message: 'Error while deleting category'});
      } else {
        logger.info('deleteCategory: Category deleted successfully');
        res.json({ status: 200, success: true, message: 'Category deleeted successfully'});
      }
    });
  }
};
