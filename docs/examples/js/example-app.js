(function(angular) {

  angular
    .module('ExampleApp', ['tw.styleguide-components', 'ngCookies'])
    .config(function ($locationProvider) {
      // undo the default ('!')
      //$locationProvider.hashPrefix('');
    });

  angular.module('ExampleApp')
    .controller('PageController', function() {


    });
})(window.angular);
