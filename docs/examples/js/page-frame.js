(function(angular) {
  'use strict';
  angular
    .module('ExampleApp')
    .component('pageFrame', {
      bindings: {
        'title': '@',
        'page': '@',
        'search': '<'
      },
      controller: ['NavTourService', function(NavTourService) {
        var $ctrl = this;

        $ctrl.burgerToggle = function() {
          $ctrl.open = !$ctrl.open;
        };
        $ctrl.showSearch = false;

        $ctrl.sideNavToggle = function() {
          $ctrl.sideNav = !$ctrl.sideNav;
        };
        $ctrl.sideNav = true;

        if ($ctrl.page === 'activity' || $ctrl.page === 'borderless-empty') {
          $ctrl.actionButtons = [
            {label: 'Send money', icon: 'icon-send', type: 'success', primary: true}
            //,{label: 'Get the card', icon: 'icon-card'}
            //,{label: 'Add money', icon: 'icon-add'}
          ];
        } else if ($ctrl.page === 'balance') {
          $ctrl.actionButtons = [
            {label: 'Send GBP', icon: 'icon-send', type: 'success', primary: true}
            ,{label: 'Add GBP', icon: 'icon-add'}
          ];
        } else if ($ctrl.page === 'recipients') {
          $ctrl.actionButtons = [
            {label: 'Add account', icon: 'icon-send', type: 'success', primary: true}
            ,{label: 'Add recipient', icon: 'icon-add'}
          ];
        } else if ($ctrl.page === 'card') {
          $ctrl.actionButtons = [
            {label: 'Freeze your card', icon: 'icon-card'}
            ,{label: 'Reveal your pin', icon: 'icon-card'}
            ,{label: 'Report a problem', icon: 'icon-card'}
            //,{label: 'Activate your card', icon: 'icon-card', type: 'success', primary: true}
          ];
        }

        /**/
        var now = new Date();
        var after = new Date(now.getTime() + (10 * 1000));
        /**
        NavTourService.addSimpleTour(
          'inviteFriends',
          'right',
          'Did you know?',
          'By inviting your friends you can earn free transfers. Invite 3 friends to earn £50 off your fees.',
          '/assets/img/css2-bg.jpg',
          '/invite',
          'Invite now'
          //,after
        );

        NavTourService.addSimpleTour(
          'card',
          'right',
          'Did you know?',
          'By inviting your friends you can earn free transfers. Invite 3 friends to earn £50 off your fees.',
          '/assets/img/css2-bg.jpg',
          '/invite',
          'Invite now'
          //,after
        );
        /**


        NavTourService.addSimpleTour(
          'profileSelect',
          'right',
          'Get the card!',
          'Sign up for a borderless account to recieve money from abroad, and to spend anywhere in the world without hidden fees.',
          'https://lienzo.s3.amazonaws.com/images/TransferWisecard4@2x.png'
        );

        NavTourService.checkAndShowTour();
        /**/
      }],
      templateUrl: "partials/page-frame.html",
      transclude: true
    });
})(window.angular);
