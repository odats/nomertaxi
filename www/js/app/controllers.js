'use strict';

/* Controllers */

var appControllers = angular.module('appControllers', []);

appControllers.controller('TaxiListCtrl', ['$scope', 'datasource',
  function($scope, datasource) {    
    if(!datasource.hasConfig()) {
      window.location.assign("#/init");
    } else {
      $scope.taxis = datasource.getTaxi();
    }
  }]);

appControllers.controller('ConfigCtrl', ['$scope', 'datasource',
  function($scope, datasource) {
    if (window.localStorage.getItem("taxi") == null) {
      console.log("init default taxi data", defaultData["taxi"]);
      window.localStorage.setItem("taxi", JSON.stringify(defaultData["taxi"]));  
    }
    
    var myConfig = datasource.getMyConfig();
    $scope.cities = datasource.getCities();
    $scope.operators = datasource.getOperators();
    $scope.myCity = myConfig.city;
    $scope.myOperator = myConfig.operator;

    $scope.saveConfig = function() {
      datasource.saveMyConfig($scope.myCity, $scope.myOperator);
      window.location.assign("#/taxi");
    }
  }]);

/* Data store layer */
angular.module('appControllers').service("datasource", DataSourceApi);