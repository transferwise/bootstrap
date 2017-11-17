(function(angular) {
  'use strict';
  angular
    .module('ExampleApp')
    .component('sideNav', {
      bindings: {
        active: '@',
        onBurgerClick: '&'
      },
      templateUrl: 'partials/side-nav.html'
    });
})(window.angular);
