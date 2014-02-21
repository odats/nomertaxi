'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('TaxiListCtrl', ['$scope', 'datasource',
  function($scope, datasource) {
    $scope.phones = datasource.getTaxi();
  }]);

appControllers.controller('ConfigCtrl', ['$scope', 'datasource',
  function($scope, datasource) {
    var myConfig = datasource.getMyConfig();
    $scope.city = myConfig.city;
    $scope.operator = myConfig.operator;
  }]);


/* Data store layer */

angular.module('appControllers').service("datasource", function() {
    this.getMyConfig = function() {
      return {
        city: 'lviv',
        operator: 'Life'
      }
    },

    this.getTaxi = function() {
      var result = [
        {'name': 'Наше таксі плюс', 'avatar': 'mock/images/1.png',
         'phone': '0631505624'},
        {'name': 'Оптимальне', 'avatar': 'mock/images/2.png',
         'phone': '0631505624'},
        {'name': 'Браво', 'avatar': 'mock/images/3.png',
         'phone': '0631505624'},
         {'name': 'Наше таксі плюс', 'avatar': 'mock/images/1.png',
         'phone': '0631505624'},
        {'name': 'Оптимальне', 'avatar': 'mock/images/2.png',
         'phone': '0631505624'},
        {'name': 'Браво', 'avatar': 'mock/images/3.png',
         'phone': '0631505624'}
      ]
      return result;
    }
  });