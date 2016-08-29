module.exports = (function() {
  var app = angular.module('app.activity-grid-component', []);

  app.component('activityGrid', {
    bindings: {
      data: '<'
    },
    templateUrl: '../../templates/components/activity-grid.html',
    controller: function() {
      this.imageURL = this.data.imageUrl || '../../img/slides/slide-4.jpg';

      var iconsArray = { MUSIC: 'icon-music-3', DANCE: 'icon-pitch', SOCCER: 'icon-soccer', SPORTS: 'icon-skiing', EDUCATION: 'icon-library'};

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
    }
  });
}());
