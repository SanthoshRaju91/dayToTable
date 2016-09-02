module.exports = (function() {
  var app = angular.module('app.popular-grid-component', []);

  app.component('popularGrid', {
    bindings: {
      data: '<'
    },
    replace: true,
    templateUrl: '../../templates/components/popular-grid.html',
    controller: function($location) {
      let iconMapper = { MUSIC: 'icon-music-4', DANCE: 'icon_set_1_icon-30', EAT: 'icon_set_1_icon-14'};
      this.categoryIconClass = iconMapper[this.data.category.toUpperCase()];
      this.ratings = [];
      let self = this;
      for(let i=0; i<this.data.ratings; i++) {
        self.ratings.push('icon-smile voted');
      }

      for(let i=0; i<(5-this.data.ratings); i++) {
        self.ratings.push('icon-smile');
      }
      this.goTo = function(activityId) {
        $location.path('activity/' + activityId);
      }
    }
  });
}());
