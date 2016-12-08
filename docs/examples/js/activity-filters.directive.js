(function(angular) {
	'use strict';
	angular
		.module('ExampleApp')
		.directive('activityFilters', [ActivityFilters]);

	function ActivityFilters() {
		return {
			bindToController: true,
			controller: function() {

			},
			controllerAs: '$ctrl',
			replace: false,
			restrict: 'E',
			scope: {
				onBurgerClick: '&'
			},
			templateUrl: 'partials/activity-filters.html'
		}
	}
})(window.angular);
