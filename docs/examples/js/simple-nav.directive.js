(function(angular) {
	'use strict';
	angular
		.module('ExampleApp')
		.directive('simpleNav', [SimpleNav]);

	function SimpleNav() {
		return {
			bindToController: true,
			controller: function() {
				var $ctrl = this;

				// TODO duplicated from other nav, make service
				$ctrl.translations = {
					"en": {
						"transfers": "Transfers",
						"history": "History",
						"recipients": "Recipients",
						"rewards": "Rewards",
						"help": "Help",
						"send1": "Send money",
						"send2": "Send"
					},
					"de": {
						"transfers": "Überweisungen",
						"history": "Verlauf",
						"recipients": "Empfänger",
						"rewards": "Freunde einladen",
						"help": "Hilfe",
						"send1": "Geld überweisen",
						"send2": "Überweisen"
					}
				}
				$ctrl.language = "en";
			},
			controllerAs: '$ctrl',
			replace: false,
			restrict: 'E',
			scope: {
				onBurgerClick: '&',
				onFilterClick: '&',
				fluid: '='
			},
			templateUrl: 'partials/simple-nav.html'
		}
	}
})(window.angular);
