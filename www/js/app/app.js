'use strict';

/* App Module */

var phonecatApp = angular.module('phonecatApp', [
  'ngRoute',
  'phonecatControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/taxi', {
        templateUrl: 'partials/taxi-list.html',
        controller: 'PhoneListCtrl'
      }).
      when('/init', {
        templateUrl: 'partials/init.html',
        controller: 'InitCtrl'
      }).
      otherwise({
        redirectTo: function() {
        	var applaunchCount = window.localStorage.getItem('launchCount');
            //Check if it already exists or not
            if(applaunchCount){
               //This is a second time launch, and count = applaunchCount
               console.log("NO, it's not a first time");
               return '/taxi'
            }else{
              //Local storage is not set, hence first time launch. set the local storage item
              window.localStorage.setItem('launchCount',1);
              //Do the other stuff related to first time launch
              return '/init'
            }
        }
      });
  }]);