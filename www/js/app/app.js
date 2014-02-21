'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'appControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/taxi', {
        templateUrl: 'partials/taxi-list.html',
        controller: 'TaxiListCtrl'
      }).
      when('/init', {
        templateUrl: 'partials/init.html',
        controller: 'ConfigCtrl'
      }).
      when('/reset', {
        redirectTo: function() {
          window.localStorage.clear();
          return '/init';
        }
      }).
      otherwise({
        redirectTo: function() {
        	return '/taxi';
        }
      });
  }]);