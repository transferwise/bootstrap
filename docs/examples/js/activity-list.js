(function(angular) {
  'use strict';
  angular
    .module('ExampleApp')
    .component('activityList', {
      templateUrl: "partials/activity-list.html",
      controller: [
        'CurrencyService',
        'TransferService',
        function(CurrencyService, TransferService) {
          var $ctrl = this;

          CurrencyService.map().then(function(currencies) {
            $ctrl.currencies = currencies;
          });

          TransferService.list({status: [
            "AWAITING_FUNDS",
            "FUNDED",
            "PROCESSING",
            "PAID_OUT",
            "PAUSED"
          ]}).then(function(transfers) {
            $ctrl.activeTransfers = transfers;
          });
          //  "CONVERTING",

          TransferService.list({status: [
            "COMPLETED",
            "CANCELLED",
          ]}).then(function(transfers) {
            $ctrl.historicTransfers = transfers;
          });
        }
      ]
    });
})(window.angular);
