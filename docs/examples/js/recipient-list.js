(function(angular) {
  'use strict';
  angular
    .module('ExampleApp')
    .component('recipientList', {
      templateUrl: "partials/recipient-list.html",
      controller: [
        'CurrencyService',
        'AccountService',
        function(CurrencyService, AccountService) {
          var $ctrl = this;

          CurrencyService.map().then(function(currencies) {
            $ctrl.currencies = currencies;
          });
          AccountService.list({isOwned: true}).then(function(accounts) {
            $ctrl.ownedAccounts = accounts;
          });
          AccountService.list({isOwned: false}).then(function(accounts) {
            $ctrl.otherAccounts = accounts;
          });
        }
      ]
    });
})(window.angular);
