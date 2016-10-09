module.exports = (function() {
  var app = angular.module('app.activity-grid-component', []);

  app.component('activityGrid', {
    bindings: {
      data: '<'
    },
    templateUrl: '../../templates/components/activity-grid.html',
    controller: function($location) {
      this.activity = this.data._doc;
      this.imageURL = this.activity.imageUrl || '../../img/slides/slide-4.jpg';

      var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};
      this.overlayIcon = iconsArray[this.activity.categoryID.categoryName.toUpperCase()];
      this.overlayName = this.activity.categoryID.categoryName;
      
      //checking for activity currently open / closed.
      this.isActive = (this.data.activityStatus.toUpperCase() == 'CLOSED') ? true: false;
      this.ratings = [];
      let self = this;
      for(let i=0; i<this.activity.ratings; i++) {
        self.ratings.push('icon-smile voted');
      }

      for(let i=0; i<(5-this.activity.ratings); i++) {
        self.ratings.push('icon-smile');
      }

      this.goToActivity = function(activityId) {
        $location.path('activity/' + activityId);
      }
    }
  });
}());
