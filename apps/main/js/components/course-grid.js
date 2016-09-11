/**
* Course grid component.
*/

module.exports = (function() {
  var app = angular.module('app.course-grid-component', []);

  app.component('courseGrid', {
    bindings: {
      data: '<'
    },
    templateUrl: '../../templates/components/course-grid.html',
    controller: function($location) {
      this.imageURL = this.data.imageUrl || '../../img/slides/slide-4.jpg';

      var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library', CRICKET: 'icon-cricket'};

      this.overlayIcon = iconsArray[this.data.categoryID.categoryName.toUpperCase()];
      this.overlayName = this.data.categoryID.categoryName;
      this.scheduleList = this.data.schedule.split('|');

      this.ratings = [];
      let self = this;
      for(let i=0; i<this.data.ratings; i++) {
        self.ratings.push('icon-smile voted');
      }

      for(let i=0; i<(5-this.data.ratings); i++) {
        self.ratings.push('icon-smile');
      }

      this.goToCourse = function(courseId) {
        $location.path('course/' + courseId);
      }
    }
  });
}());
